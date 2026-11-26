export const STATUSES = ["Applied", "Interview", "Offer", "Rejected"] as const;

export type Status = (typeof STATUSES)[number];

export const STATUS_COLOR: Record<Status, string> = {
  Applied: "#4D6B43",
  Interview: "#B45309",
  Offer: "#0F766E",
  Rejected: "#475569",
};
export const STATUS_SOFT: Record<Status, string> = {
  Applied: "#E3EBDD",
  Interview: "#FDE8CF",
  Offer: "#D5EEEC",
  Rejected: "#E4E6F0",
};
