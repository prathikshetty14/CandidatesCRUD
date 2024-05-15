import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { deleteCandidateQuery, getCandidateQuery } from "../api/candidates";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { data, isLoading, isError, isFetching } = getCandidateQuery();

  const deleteCandidate = deleteCandidateQuery();

  if (isLoading || isFetching) return <Loader2 />;

  return (
    <>
      <div className="mx-auto w-full max-w-screen-xl px-10 py-20 md:py-0 md:px-20 mb-12 mt-40 sm:mt-40 flex flex-col items-center justify-center text-center">
        <Table>
          <TableCaption>A list of all the candidates.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((candidate) => (
              <TableRow
                key={candidate.id}
                onClick={() => {
                  navigate(`/candidate/${candidate.id}`, {
                    state: { candidate: candidate },
                  });
                }}
                className="hover:cursor-pointer"
              >
                <TableCell className="font-medium text-start">
                  {candidate.personalInformation.firstName}{" "}
                  {candidate.personalInformation.lastName}
                </TableCell>
                <TableCell className="text-start">
                  {candidate.totalWorkExperience} years
                </TableCell>
                <TableCell className="text-start">
                  {candidate.summary}
                </TableCell>
                <TableCell className="text-start">
                  {candidate.personalInformation.contactNumber}
                </TableCell>
                <TableCell className="flex justify-end px-4">
                  <Button
                    onClick={() => {
                      deleteCandidate.mutate(candidate.id, {
                        onSuccess: () => {
                          toast.error("Candidate deleted.");
                          queryClient.invalidateQueries(["candidate"]);
                        },
                        onError: (error) => {
                          console.log("Error", error);
                          toast.warning("Error occured. Try again later.");
                        },
                      });
                    }}
                    variant={"ghost"}
                    className="hover:text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
