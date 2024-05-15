import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { createCandidateQuery, updateCandidateQuery } from "../api/candidates";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// MUI Imports for Date
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function Candidate() {
  const { candidateId } = useParams();

  const location = useLocation();

  const candidateData = location.state?.candidate;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...(candidateData || {}),
    },
  });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const createCandidate = createCandidateQuery();

  const updateCandidate = updateCandidateQuery();

  const [date, setDate] = useState(
    candidateData
      ? dayjs(candidateData?.personalInformation?.dateOfBirth)
      : null
  );

  const [toggle, seToggle] = useState(
    candidateData ? candidateData?.isRemote : false
  );

  function onToggle() {
    seToggle(!toggle);
  }

  function onSubmit(data) {
    const finalData = {
      ...data,
      personalInformation: {
        ...data.personalInformation,
        dateOfBirth: date,
      },
      isRemote: toggle,
    };

    if (candidateId) {
      updateCandidate.mutate(finalData, {
        onSuccess: (data) => {
          toast.success("Candidate details updated.");
          queryClient.invalidateQueries(["candidate"]);
        },
        onError: (error) => {
          console.log("Error", error);
          toast.error(error.message);
        },
      });
    } else {
      createCandidate.mutate(finalData, {
        onSuccess: (data) => {
          toast.success("Candidate created.");
          queryClient.invalidateQueries(["candidate"]);
          navigate("/");
        },
        onError: (error) => {
          console.log("Error", error);
          toast.error(error.message);
        },
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl px-10 py-20 md:py-0 md:px-20 mb-12 mt-20 flex flex-col items-center justify-center text-center">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>
              {candidateData ? "Edit" : "Create a"} Candidate
            </CardTitle>
            <CardDescription>
              Make sure to enter the correct details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="firstName" className="text-start px-2">
                  First Name
                </Label>
                <input
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  {...register("personalInformation.firstName", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName" className="text-start px-2">
                  Last Name
                </Label>
                <input
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  {...register("personalInformation.lastName", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName" className="text-start px-2">
                  Date
                </Label>
                {/* <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover> */}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={date}
                    onChange={(value) => {
                      console.log("value", value);
                      setDate(value);
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName" className="text-start px-2">
                  Contact Number
                </Label>
                <input
                  type="number"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  {...register("personalInformation.contactNumber", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName" className="text-start px-2">
                  Email
                </Label>
                <input
                  type="text"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  {...register("personalInformation.email", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName" className="text-start px-2">
                  Remote
                </Label>
                <Switch
                  id="remote"
                  className="mx-2"
                  checked={toggle}
                  onCheckedChange={onToggle}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName" className="text-start px-2">
                  Summary
                </Label>
                <textarea
                  type="text"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  {...register("summary", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName" className="text-start px-2">
                  Experience
                </Label>
                <input
                  type="number"
                  step={0.1}
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  {...register("totalWorkExperience", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName" className="text-start px-2">
                  Role
                </Label>
                <input
                  type="text"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  {...register("resumeText", {
                    required: true,
                  })}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="lastName" className="text-start px-2">
                  Resume / CV Link
                </Label>
                <input
                  type="text"
                  className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 py-2 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  {...register("url", {
                    required: true,
                  })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
                toast.warning("Candidate details discarded.");
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
