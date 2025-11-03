import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function GhostShiftSimulator() {
  const [operators, setOperators] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'operators'), (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOperators(data);
    });
    return unsub;
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {operators.map(op => (
        <Card key={op.id} className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{op.name || op.id}</h3>
            <Badge variant={op.trustRating > 0.7 ? "success" : "warning"}>
              {(op.trustRating * 100).toFixed(0)}%
            </Badge>
          </div>
          <p className="text-sm text-gray-600">Status: {op.onboardingStatus}</p>
        </Card>
      ))}
    </div>
  );
}
