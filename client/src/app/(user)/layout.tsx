import { AuthProvider } from "@/providers/auth-provider";
import UserProvider from "@/providers/user-provider";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <UserProvider>
        <main className="w-full h-auto relative">
          <div className="pt-[50px]">{children}</div>
        </main>
      </UserProvider>
    </AuthProvider>
  );
}
