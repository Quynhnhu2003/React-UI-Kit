import { Action } from "lottie-react";

export type BlockReferralShareProps = {
  blockData: BlockReferralShareData | undefined;
};
export type BlockReferralShareData = {
  inviteLabel: string;
  inviteCode: string;
  inviteLink: string;
  qrCode: string;
  logoQr: string;
  actionButtonShare: Action;
};
export type BlockBannerProps = {
  listBanner: string[];
};
export type BlockGiftProps = {
  listGifts: Gift[];
};
export type Gift = {
  icon: string;
  text: string;
  textReplace: [
    {
      key: string;
      value: string;
      action: Action;
    }
  ];
};
export type HistoryType = {
  recipient: { name: string; contractNo: string; activeDate: string };
  sender: { reward: string; foxGold: string; navigation: Action | null };
};
export type HistoryGroup = {
  groupDate: string;
  items: HistoryType[];
};
export type GetReferralInfoResponse = {
  inviteIcon: string;
  inviteLabel: string;
  inviteCode: string;
  inviteLink: string;
  qrCode: string;
  logoQr: string;
  templates: {
    sms: string;
    mail: string;
    other: string;
    android: string;
  };
  headerImgs: string[];
  gifts: GiftReferral[];
  giftDetailAction: Action;
  actionButtonShare: Action;
};
export type GiftReferral = {
  icon: string;
  text: string;
  textReplace: [
    {
      key: string;
      value: string;
      action: Action;
    }
  ];
};
export type GetHistoryReferralResponse = {
  list: HistoryGroup[];
  page: number;
};
export type GetHistoryReferralRequest = {
  contractNo: string;
  page: number;
};
