import { ApiError } from "../utils/apiErrors.js";
import { AsyncHandlers } from "../utils/asyncHandlers.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";



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
  console.log(createdUser)

  if (!createdUser) {
    throw new ApiError(500,"Something went wrong while registering user")
  }


  return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registerd Successfully")
  )

});

export { registerUser };
