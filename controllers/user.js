import User from "../models/user";
import handleError from "../utils/handleError";

export async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  res.json({ allDbUsers });
}

export async function handleGetUserByID(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User Not Found." });
}

export async function handleUpdateUserById(req, res) {
  const body = req.body;
  const result = User.findByIdAndUpdate(req.params.id);
  await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.jobtitle,
    gender: body.gender,
  });
  return res.status(201).json({ status: "Success", id: result._id });
}

export async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}

export async function handleCreateUser(req, res) {
  try {
    const result = await User.create(req.body);
    return res.status(201).json({ status: "Success", id: result._id });
  } catch (err) {
    return handleError(err, req, res);
  }
}
