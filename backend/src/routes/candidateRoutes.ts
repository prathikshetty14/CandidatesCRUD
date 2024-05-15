import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const candidates = await prisma.candidate.findMany({
      include: {
        personalInformation: true,
      },
    });
    res.json(candidates);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Could not fetch candidates." });
  }
});

interface customReq extends Request {
    
}

router.post("/", async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const createdCandidate = await prisma.candidate.create({
      data: {
        isRemote: body.isRemote,
        totalWorkExperience: body.totalWorkExperience,
        personalInformation: {
          create: {
            firstName: body.personalInformation.firstName,
            lastName: body.personalInformation.lastName,
            dateOfBirth: new Date(body.personalInformation.dateOfBirth),
            contactNumber: body.personalInformation.contactNumber,
            email: body.personalInformation.email,
          },
        },
        summary: body.summary,
        resumeText: body.resumeText,
        url: body.url,
      },
    });
    res.json(createdCandidate);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Could not create candidate." });
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedCandidate = await prisma.candidate.update({
      where: { id },
      data: {
        isRemote: body.isRemote,
        totalWorkExperience: body.totalWorkExperience,
        personalInformation: {
          update: {
            firstName: body.personalInformation.firstName,
            lastName: body.personalInformation.lastName,
            dateOfBirth: new Date(body.personalInformation.dateOfBirth),
            contactNumber: body.personalInformation.contactNumber,
            email: body.personalInformation.email,
          },
        },
        summary: body.summary,
        resumeText: body.resumeText,
        url: body.url,
      },
    });
    res.json(updatedCandidate);
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ error: "Could not update candidate." });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.candidate.delete({
      where: { id },
    });
    res.json({ message: "Candidate deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Could not delete candidate." });
  }
});

export default router;
