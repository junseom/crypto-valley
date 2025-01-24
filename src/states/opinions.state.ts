import { BehaviorSubject } from "rxjs";
import { mockOpinionsData } from "./mock-opinions.data";
import { useEffect, useState } from "react";

export interface Opinion {
  id: number;
  coin: string;
  cause: string;
  effect: string;
  content: string;
  sourceType: string;
  link: string;
}

const $opinions = new BehaviorSubject<Opinion[]>(mockOpinionsData);

export const addOpinion = (opinion: Omit<Opinion, "id">) => {
  const prev = $opinions.getValue();
  $opinions.next([...prev, { ...opinion, id: prev.length }]);
};

export const useOpinions = () => {  
    const [opinions, setOpinions] = useState<Opinion[] | null>(null);
    useEffect(() => {
        $opinions.subscribe((p) => setOpinions(p));
    }, []);
    return opinions;
}