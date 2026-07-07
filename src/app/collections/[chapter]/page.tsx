import { redirect } from "next/navigation";

// All collection sub-routes (brume, transitional, aw26, etc.) redirect to /collections
export default function CollectionChapter() {
  redirect("/collections");
}
