import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/AppError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudianry } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user data details from frontend
  // validation - not empty
  // check if user already exists:
  // check for images, check for avatar
  // upload on cloudinary, avatar check
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  const { fullname, email, username, password } = req.body;
  if (fullname && email && username && password) {
    throw new ApiError(400, "All fields are required!!");
  }

  const existedUser = User.findOne({ $or: [{ username }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Needed the avatar!!");
  }

  const avatar = await uploadOnCloudianry(avatarLocalPath);
  const coverImage = await uploadOnCloudianry(coverImageLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Needed the avatar!!");
  }
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUserName=await User.findById({_id:user._id}).select(
    "-password -refreshToken"
  )

  if (!createdUserName) {
    throw new ApiError(404,"Something went wrong while registering the user")
  }


return res.status(201).json(
  new ApiResponse(201,createdUserName,"User registered succesfully")
)

});

export { registerUser };
