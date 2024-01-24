import { request } from "@/plugin/request";

/**
 * 启停任务
 */
export function updateJobStatus(params: any) {
  return request({
    method: "put",
    url: "/admin/job/status",
    data: params,
  });
}

