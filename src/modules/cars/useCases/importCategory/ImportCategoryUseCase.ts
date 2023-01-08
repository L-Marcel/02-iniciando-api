import fs from "fs";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ApiError } from "../../../../errors/ApiError";
import csvParse from "csv-parse";
import { CategoryConstructor } from "../../model/Category";

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  loadCategories(file: Express.Multer.File) {
    return new Promise<CategoryConstructor[]>((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse.parse();
      const categories: CategoryConstructor[] = [];
  
      stream.pipe(parseFile);
  
      parseFile.on("data", async(line: string[]) => {
        const [name, description] = line;
  
        categories.push({
          name,
          description
        });
      }).on("end", async() => {
        await fs.promises.unlink(file.path);
        resolve(categories);
      }).on("error", (err) => {
        reject(err);
      });
    });
  }

  async execute(file?: Express.Multer.File) {
    if(!file) {
      throw new ApiError(400, "File is missing.");
    }

    const categories = await this.loadCategories(file);

    categories.forEach(({ name, description }) => {
      const existCategory = this.categoriesRepository.findByName(name);
    
      if(!existCategory) {
        this.categoriesRepository.create({
          name, 
          description 
        });
      }
    });
  }
}