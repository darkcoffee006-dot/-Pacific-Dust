"use client";
import { useQuickAdd } from "@/context/QuickAddContext";
import QuickAddModal from "@/components/ui/QuickAddModal";

export default function QuickAddModalRoot() {
  const { product, close } = useQuickAdd();
  return <QuickAddModal product={product} onClose={close} />;
}
