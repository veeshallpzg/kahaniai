import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface User {
  id: string;
  email: string;
  plan: "free" | "pro";
  credits: number;
}

export async function getOrCreateUser(userId: string, email: string): Promise<User | null> {
  try {
    // Try to get existing user
    const { data: existingUser, error: getError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (existingUser) {
      return existingUser as User;
    }

    // Create new user with free plan (1 credit)
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert({
        id: userId,
        email: email,
        plan: "free",
        credits: 1,
      })
      .select()
      .single();

    if (createError) {
      console.error("Error creating user:", createError);
      return null;
    }

    return newUser as User;
  } catch (error) {
    console.error("Error in getOrCreateUser:", error);
    return null;
  }
}

export async function checkCredits(userId: string): Promise<{ hasCredits: boolean; credits: number; plan: string }> {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("credits, plan")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return { hasCredits: false, credits: 0, plan: "free" };
    }

    // Pro users have unlimited credits
    if (user.plan === "pro") {
      return { hasCredits: true, credits: Infinity, plan: user.plan };
    }

    return {
      hasCredits: user.credits > 0,
      credits: user.credits,
      plan: user.plan,
    };
  } catch (error) {
    console.error("Error checking credits:", error);
    return { hasCredits: false, credits: 0, plan: "free" };
  }
}

export async function decrementCredit(userId: string): Promise<boolean> {
  try {
    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("credits, plan")
      .eq("id", userId)
      .single();

    if (fetchError || !user) {
      return false;
    }

    // Pro users don't need credit deduction
    if (user.plan === "pro") {
      return true;
    }

    if (user.credits <= 0) {
      return false;
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ credits: user.credits - 1, updated_at: new Date().toISOString() })
      .eq("id", userId);

    return !updateError;
  } catch (error) {
    console.error("Error decrementing credit:", error);
    return false;
  }
}

export async function upgradeToPro(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("users")
      .update({ plan: "pro", updated_at: new Date().toISOString() })
      .eq("id", userId);

    return !error;
  } catch (error) {
    console.error("Error upgrading to pro:", error);
    return false;
  }
}

export async function resetDailyCredits(): Promise<void> {
  try {
    // Reset free users' credits to 1
    const { error } = await supabase
      .from("users")
      .update({ credits: 1, updated_at: new Date().toISOString() })
      .eq("plan", "free");

    if (error) {
      console.error("Error resetting daily credits:", error);
    }
  } catch (error) {
    console.error("Error in resetDailyCredits:", error);
  }
}
