import { Router } from "express";
import { addDepartment, departmentList, updateDepartment, deleteDepartment, getDepartmentById } from "../controllers/departmentController.js";

const router = Router();

router.get('/', departmentList)
  .get('/:id', getDepartmentById)
  .post('/', addDepartment)
  .put('/:id', updateDepartment)
  .delete('/:id', deleteDepartment);

export default router;