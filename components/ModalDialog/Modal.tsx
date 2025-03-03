import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const UTMModal = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="px-4 py-2 border border-black bg-white text-black hover:bg-gray-100 rounded-md">
        UTM
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg border border-black">
        <div className="flex justify-between items-center mb-4">
          <Dialog.Title className="text-lg font-semibold text-black">
            UTM Parameters
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="text-black hover:bg-gray-200 rounded-full p-2">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              UTM Source
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="e.g., facebook"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              UTM Medium
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="e.g., cpc"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              UTM Campaign
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="e.g., summer_sale"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Dialog.Close asChild>
            <button className="px-4 py-2 border border-black bg-white text-black hover:bg-gray-100 rounded-md">
              Save
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

const CreateLinkModal = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="px-4 py-2 border border-black bg-black text-white hover:bg-gray-900 rounded-md flex items-center gap-2">
        Create link
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg border border-black">
        <div className="flex justify-between items-center mb-4">
          <Dialog.Title className="text-lg font-semibold text-black">
            New Link
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="text-black hover:bg-gray-200 rounded-full p-2">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </div>

        <div className="space-y-4">
          {/* Destination URL */}
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Destination URL
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Short Link */}
          <div className="flex gap-2">
            <select className="border border-gray-300 p-2 rounded-md">
              <option>dub.sh</option>
            </select>
            <input
              className="flex-1 border border-gray-300 p-2 rounded-md"
              placeholder="Enter short custom name"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Tags
            </label>
            <input
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Select tags..."
            />
          </div>

          {/* Comments */}
          <div>
            <label className="block text-xs font-bold text-black mb-1">
              Comments
            </label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Add comments"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div className="flex gap-2">
            <UTMModal />
          </div>
          <Dialog.Close asChild>
            <button className="px-4 py-2 border border-black bg-white text-black hover:bg-gray-100 rounded-md">
              Save changes
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default CreateLinkModal;
