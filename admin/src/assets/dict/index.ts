import type { IDict } from "@/typings";

const dicts: IDict[] = [
  {
    code: "question_type",
    items: [
      { label: "单选题", value: "1" },
      { label: "多选题", value: "2" },
      { label: "判断题", value: "3" },
      { label: "填空题", value: "4" },
    ],
  },
  {
    code: "security_level",
    name: '保密等级',
    items: [
      { label: "机密", value: '1' },
      { label: "保密", value: '2' },
      { label: "公开", value: '10' },
    ],
  },
];

export default dicts;
