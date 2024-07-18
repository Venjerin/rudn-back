import { ApplicationModule } from "../models/Application.js";

export const create = async (req, res) => {
  try {
    const doc = new ApplicationModule({
      surname: req.body.surname,
      name: req.body.name,
      patronymic: req.body.patronymic,
      organization: req.body.organization,
      phoneNumber: req.body.phoneNumber,
      user: req.userId,
    });

    const application = await doc.save();

    res.json(application);
  } catch (error) {
    console.error("Error during application creation:", error);
    res.status(500).json({ message: "Error during application creation" });
  }
};
