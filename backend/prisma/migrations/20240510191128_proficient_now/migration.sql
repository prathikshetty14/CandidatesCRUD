-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "isRemote" BOOLEAN NOT NULL,
    "totalWorkExperience" TEXT NOT NULL,
    "personalInformationId" TEXT NOT NULL,
    "summary" TEXT,
    "resumeText" TEXT,
    "isOutdoor" BOOLEAN,
    "isReadyToRelocate" BOOLEAN,
    "isContract" BOOLEAN,
    "isFulltime" BOOLEAN,
    "isEngineering" BOOLEAN,
    "isIT" BOOLEAN,
    "locationId" TEXT,
    "searchLocation" TEXT,
    "url" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "fieldOfStudy" TEXT NOT NULL,
    "yearOfCompletion" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInformation" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PersonalInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_id_key" ON "Candidate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_personalInformationId_key" ON "Candidate"("personalInformationId");

-- CreateIndex
CREATE INDEX "Candidate_isRemote_idx" ON "Candidate"("isRemote");

-- CreateIndex
CREATE INDEX "Candidate_isReadyToRelocate_idx" ON "Candidate"("isReadyToRelocate");

-- CreateIndex
CREATE INDEX "Candidate_isContract_idx" ON "Candidate"("isContract");

-- CreateIndex
CREATE INDEX "Candidate_isFulltime_idx" ON "Candidate"("isFulltime");

-- CreateIndex
CREATE INDEX "Candidate_isEngineering_idx" ON "Candidate"("isEngineering");

-- CreateIndex
CREATE INDEX "Candidate_isIT_idx" ON "Candidate"("isIT");

-- CreateIndex
CREATE UNIQUE INDEX "WorkExperience_id_key" ON "WorkExperience"("id");

-- CreateIndex
CREATE INDEX "WorkExperience_candidateId_idx" ON "WorkExperience"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Education_id_key" ON "Education"("id");

-- CreateIndex
CREATE INDEX "Education_candidateId_idx" ON "Education"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInformation_id_key" ON "PersonalInformation"("id");

-- CreateIndex
CREATE INDEX "PersonalInformation_email_idx" ON "PersonalInformation"("email");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_personalInformationId_fkey" FOREIGN KEY ("personalInformationId") REFERENCES "PersonalInformation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkExperience" ADD CONSTRAINT "WorkExperience_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
