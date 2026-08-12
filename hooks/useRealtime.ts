import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtime(roomId: string) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!roomId) return;

    // Create a channel for this specific room
    const roomChannel = supabase.channel(`room_${roomId}`, {
      config: {
        broadcast: { ack: true }
      }
    });

    // Subscribe to the channel
    roomChannel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log(`Connected to room ${roomId}`);
      }
    });

    setChannel(roomChannel);

    return () => {
      roomChannel.unsubscribe();
    };
  }, [roomId]);

  // Helper function to send broadcast events
  const broadcast = async (event: string, payload: any) => {
    if (channel) {
      await channel.send({
        type: 'broadcast',
        event: event,
        payload: payload,
      });
    }
  };

  return { channel, broadcast };
}
