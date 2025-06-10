"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

export function BtnLogout() {
  const router = useRouter();
  const mutation = useLogout();  // mutation.mutateAsync akan otomatis resetQueries

  const handleLogout = async () => {
    try {
      await mutation.mutateAsync();

      // cookies sudah dihapus di hook atau di sini
      document.cookie = "userName=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "avatar=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-600 text-neutral-900 font-bold">
          Log Out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            {`Are you sure you want to log out of the application?
              You'll need to log in again to access the dashboard.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-[var(--bitunix)] hover:bg-[var(--bitunix-hover)] text-black font-bold"
            onClick={handleLogout}
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
