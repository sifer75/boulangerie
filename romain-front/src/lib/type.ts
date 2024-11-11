export type DaysState = {
  id?: number;
  title: string;
  mardi: number;
  mercredi: number;
  jeudi: number;
  vendredi: number;
  samedi: number;
  dimanche: number;
  paton: number;
};

export type ProductDetailProps = {
  product: DaysState;
  onClose: () => void;
  open: boolean;
  onUpdate: (arg0: DaysState) => void;
};
