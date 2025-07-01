import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { SubmitCreate } from "./Submit";

interface FormFooterProps {
  dataBody: {
    destination_url: string;
    tags: string[];
    short_link?: string;
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
    referral?: string;
    vipCode?: string;
  };
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

interface ApiResponse {
  status: number;
  message: string;
  data: any;
}

interface ApiError {
  response?: {
    status: number;
    data: {
      message?: string;
      errors?: {
        short_link?: string[];
        [key: string]: string[] | undefined;
      };
    };
  };
  message: string;
}

export const FormFooter: React.FC<FormFooterProps> = ({
  dataBody,
  setOpen,
  refetch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [shortLinkError, setShortLinkError] = useState<string>("");

  // ✅ Custom notification function
  const showNotification = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    // You can replace this with your preferred notification system
    if (type === "success") {
      alert(`✅ ${message}`);
    } else {
      alert(`❌ ${message}`);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setShortLinkError(""); // ✅ Reset error before submit

    try {
      const response: ApiResponse = await SubmitCreate({ dataBody });

      if (response.status === 200 || response.status === 201) {
        console.log("Success:", response);
        showNotification("Short link created successfully!", "success");
        setOpen(false);
        refetch();
      }
    } catch (error) {
      console.error("Error:", error);

      const apiError = error as ApiError;

      // ✅ Handle error 422 for duplicate short link
      if (apiError?.response?.status === 422) {
        const errorData = apiError.response.data;

        // Check if error is related to short_link
        if (errorData?.errors?.short_link) {
          setShortLinkError(errorData.errors.short_link[0]);
          showNotification("Short link already in use!", "error");
        } else if (errorData?.message) {
          setShortLinkError(errorData.message);
          showNotification(errorData.message, "error");
        } else {
          showNotification("Error creating short link!", "error");
        }
      } else {
        // Handle other errors
        const errorMessage =
          apiError?.message || "An unexpected error occurred";
        setShortLinkError(errorMessage);
        showNotification("Server error occurred!", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* ✅ Show error message if exists */}
      {shortLinkError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm font-medium">
            ⚠️ {shortLinkError}
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !dataBody.destination_url}
          className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black"
        >
          {isLoading ? "Creating..." : "Create Short Link"}
        </Button>
      </div>
    </div>
  );
};
