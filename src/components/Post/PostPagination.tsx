import { memo, SetStateAction } from "react";
import { Button } from "@/components/UI/Button";

export const PostPagination = memo(
  ({
    page,
    setPage,
    totalPages,
  }: {
    page: number;
    setPage: (value: SetStateAction<number>) => void;
    totalPages: number;
  }) => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-6">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          color="blue"
        >
          Previous
        </Button>
        <span className="mx-2 my-auto">
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setPage((prev) => (prev < totalPages ? prev + 1 : prev))
          }
          disabled={page === totalPages}
          color="blue"
        >
          Next
        </Button>
      </div>
    );
  }
);
