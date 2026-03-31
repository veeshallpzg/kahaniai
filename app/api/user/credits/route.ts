import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { checkCredits, getOrCreateUser, decrementCredit } from "@/lib/users";

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get all the details from Clerk for additional user data
    const clerkUser = await currentUser();
    
    if (!clerkUser || !clerkUser.emailAddresses[0]) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const email = clerkUser.emailAddresses[0].emailAddress;

    // Ensure user exists in our database
    const user = await getOrCreateUser(userId, email);
    
    if (!user) {
      return NextResponse.json(
        { error: "Failed to get user" },
        { status: 500 }
      );
    }

    // Check and return credits
    const creditInfo = await checkCredits(userId);
    
    return NextResponse.json(creditInfo);
  } catch (error) {
    console.error("Error in /api/user/credits GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Decrement credit after successful generation
    const success = await decrementCredit(userId);
    
    if (!success) {
      return NextResponse.json(
        { error: "Failed to decrement credit" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/user/credits POST:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}