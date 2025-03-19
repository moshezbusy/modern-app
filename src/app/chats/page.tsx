import { Icons } from "@/components/icons"

export default function ChatsPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[420px] flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <Icons.message className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold tracking-tight">Welcome to Chats</h2>
        <p className="mt-2 text-center text-muted-foreground">
          Select a conversation from the sidebar to start chatting. You can search for specific conversations or use the filters to find what you're looking for.
        </p>
      </div>
    </div>
  )
} 