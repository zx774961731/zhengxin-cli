import request from '@/utils/request';
// 获取考勤详情
export function getAtteArchiveDetail(data) {
  return request({
    url: `/attendances/archive/${data.userId}/${data.yearMonth}`
  });
}

// 获取图片
export function getImg(id) {
  return request({
    url: `/file/download/${id}`,
    responseType: 'blob'
  });
}

export function importArchive(data) {
  return request({
    url: '/archive/atte/export',
    method: 'post',
    data
  });
}
