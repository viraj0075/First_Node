import { ApiError } from "../utils/apiErrors.js";
import { AsyncHandlers } from "../utils/asyncHandlers.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";

const genrateAccessTokenandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.genrateAccessToken();
    const refreshToken = await user.genrateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while gerating the access and refresh token"
    );
  }
};

const registerUser = AsyncHandlers(async (req, res) => {
  //get the data from the Frontend
  //chk the data  is empty or not
  //chk if the user is already exist or not in database
  //chk for the images and avatar
  //upload them to cloudinary
  //create user object -crete entry  in the db
  //remove the password feild and the refresh token from the feild
  //chk for the user object
  //return res

  const { fullname, email, username, password } = req.body;

  //chk the data  is empty or not
  if (
    [fullname, email, username, password].some((item) => item?.trim() === "")
  ) {
    throw new ApiError(400, "All Feilds Are Required");
  }

  //would find the username and email from the database
  //chk if the user is already exist or not in database
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(existedUser, "This is Existed user");
  if (existedUser) {
    throw new ApiError(409, "Username and email already exist");
  }

  //chk for the images and avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log(avatarLocalPath, "This is AvatarlocalPath");

  const coverImagePath = req.files?.coverImage[0]?.path;
  console.log(coverImagePath, "This is AvatarlocalPath");

  //classic way to chk the file
  // let coverPath
  // if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0)
  //   {
  //     coverPath = req.files.coverImage[0];
  //   }

  if (!avatarLocalPath) throw new ApiError(400, "Aavtar File is required");

  //uplaod on the cloudinary
  const avatarupload = await uploadOnCloudinary(avatarLocalPath);
  const coverImageUpload = await uploadOnCloudinary(coverImagePath);
  //   console.log("Uploaded Path of the Avataar and Cover image",avatarupload,coverImageUpload);

  if (!avatarupload) throw new ApiError(400, "Aavtar File is required");

  //make the DB entry
  const user = await User.create({
    fullname,
    avatar: avatarupload.url,
    coverImage: coverImageUpload?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  //it would exclude the password and the refresh from the object
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log(createdUser);

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registerd Successfully"));
});

const loginUser = AsyncHandlers(async (req, res) => {
  //give access token and refresh token
  //send cookie

  //req body data
  const { email, username, password } = req.body;

  //Enter the Username and Password
  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }
  console.log(username);

  //find user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  //if user exist chk password
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log(isPasswordValid);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }

  //refresh and access token
  const tokens = await genrateAccessTokenandRefreshToken(user._id);
  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;

  // console.log(accessToken,refreshToken)

  //give the feilds which is required only
  const loggedInUser = await User.findById(user._id).select(
    " -password -refreshToken "
  );
  console.log(loggedInUser, "This is logged in User");

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logges In Successfully"
      )
    );
});

const logoutUser = AsyncHandlers(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      //this opreator is used for the update the specific feild in the Database
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User Logout Successfully"))
});

const refreshAccessToken = AsyncHandlers(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  console.log(incomingRefreshToken,"    ",req.cookies.refreshToken,"This is incomingRefreshToken")

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  //the token which user have is encoded we want to chk the DB refrsh token wioth decoded token of the User
  try {
    const decodedtoken = await jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    
    const user = await User.findById(decodedtoken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid Refresh Token");
    }
    
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, " Refresh Token expired or used");
    }
    console.log(user?.refreshToken,"This is Decoded Token")

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await genrateAccessTokenandRefreshToken(user._id);

    console.log(refreshToken,"This is new refresh Token")

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: refreshToken },
          "Access Token Refreshed"
        )
      );  
  } catch (error) {
    throw new ApiError(401, error?.message || "Something went wrong in refresh token");
  }
});

// const updatePassword = AsyncHandlers(async(req,res) => {

//   const{oldPassword,newPassword} = req.body;

//   //it would be only change when user is logged it wpould chk by the JWT token so if it is valid then the verify JWT have the user so we can write req.user._id
//   const user = await User.findById(req.user?._id);




// })

export { registerUser, loginUser, logoutUser,refreshAccessToken };
