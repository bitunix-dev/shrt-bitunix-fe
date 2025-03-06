import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  
  interface ModalForEditingProps {
    selectedItem: {
      short_link: string;
      destination_url: string;
    } | null;
    setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
  }
  
  export const ModalForEditing: React.FC<ModalForEditingProps> = ({
    selectedItem,
    setSelectedItem,
  }) => {
    return (
      <Dialog open={Boolean(selectedItem)} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Link</DialogTitle>
            <DialogDescription>Modify the short link details.</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="p-4">
              <p className="text-lg font-semibold">{selectedItem.short_link}</p>
              <p className="text-sm text-gray-500">Destination: {selectedItem.destination_url}</p>
            </div>
          )}
          <Button onClick={() => setSelectedItem(null)}>Close</Button>
        </DialogContent>
      </Dialog>
    );
  };
  