import fs from "fs";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import csvParse from "csv-parse";
import { CategoryConstructor } from "../../entities/Category";
import { inject, injectable } from "tsyringe";

@injectable()
export class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

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
      throw new Error("File is missing.");
    }

    const categories = await this.loadCategories(file);

    categories.forEach(async({ name, description }) => {
      const existCategory = await this.categoriesRepository.findByName(name);
    
      if(!existCategory) {
        await this.categoriesRepository.create({
          name, 
          description 
        });
      }
    });
  }
}