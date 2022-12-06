import { Response, Request } from "express";
import Consult from "../models/consult";

export const getAllConsults = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const consults = await Consult.find();
    // console.log(consults.length);
    if (consults.length > 0) {
      return res.json({
        msg: "Consults successfully found",
        consults,
        found: true,
      });
    }
    return res.json({
      msg: "Consults not found or not existing",
      found: false,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createConsult = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  try {
    const newConsult = new Consult(req.body);
    if (newConsult) {
      await newConsult.save();
      return res.json({ msg: "Consult created", created: true, newConsult });
    }
    return res.json({ msg: "Consult not created", created: false });
  } catch (error) {
    console.error(error);
  }
};

export const deleteConsult = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  try {
    const { id } = req.params;
    const consult = await Consult.findByIdAndDelete(id);
    if (consult) {
      return res.json({ msg: "Consult deleted", deleted: true, consult });
    }
    return res.json({ msg: "Consult not deleted", deleted: false });
  } catch (error) {
    console.error(error);
  }
};

export const updateConsult = async (
  req: Request,
  res: Response
): Promise<Response | any> => {
  // Evitar registros duplicados
  const { title, description, status, price } = req.body;
  const { id } = req.params;
  const consult = await Consult.findById(id);
  if (!consult) {
    return res.json({
      msg: "consult not found or nor existing",
      updated: false,
    });
  }

  consult.title = title || consult.title;
  consult.description = description || consult.description;
  consult.status = status || consult.status;
  consult.price = price || consult.price;

  await consult.save();

  return res.json({
    msg: "consult successfully updated",
    consult,
    updated: true,
  });
};
