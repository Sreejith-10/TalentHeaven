import NotificationCard from "@/components/ui/cards/notification-card";

export default function Notifications() {
  return (
    <div className="w-full min-h-screen h-auto flex flex-col">
      <div className="mx-[25%] xl:mx-[5%] flex flex-col py-10 px-20">
        <div className="py-3">
          <h1 className="font-semibold text-2xl">Notifications</h1>
        </div>
        <div className="flex flex-col gap-5 py-5">
          <h1>This page is under development</h1>
        </div>
      </div>
    </div>
  );
}
