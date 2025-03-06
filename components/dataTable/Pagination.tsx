import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
}) => {
  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      {/* Tombol Previous */}
      <Button
        className="bg-lime-500 text-black"
        onClick={prevPage}
        disabled={currentPage === 1} // ✅ Disabled jika di halaman pertama
      >
        ← Previous
      </Button>

      {/* Info Halaman */}
      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>

      {/* Tombol Next */}
      <Button
        className="bg-lime-500 text-black"
        onClick={nextPage}
        disabled={currentPage === totalPages} // ✅ Disabled jika di halaman terakhir
      >
        Next →
      </Button>
    </div>
  );
};
