"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "./ChatWindow";

export function ChatBubble() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  return (
    <>
      <AnimatePresence>{open && <ChatWindow onClose={() => setOpen(false)} />}</AnimatePresence>

      {!open && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
          className="fixed bottom-6 right-6 z-50"
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          >
            <Button
              size="icon-lg"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le chat"
              className="size-14 rounded-full bg-gold text-background shadow-lg shadow-gold/20 hover:bg-gold-light"
            >
              <MessageCircle className="size-6" />
              <span className="sr-only">Ouvrir le chat</span>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
