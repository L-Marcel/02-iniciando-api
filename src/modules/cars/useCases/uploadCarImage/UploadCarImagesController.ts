import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

type File = {
  filename: string;
}

export class UploadCarImagesController {
  async handle(req: Request, res: Response) {
    const { id: car_id } = req.params;
    const images = req.files as File[];

    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const filenames = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id,
      images_name: filenames
    });

    return res.status(201).send();
  }
}