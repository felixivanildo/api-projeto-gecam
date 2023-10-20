function GetAllReports (){
    return "select report_id as \"id\", u.unityname, c.cityname , s.sectorname , r.updatedat as \"createdAt\", r.reportname as \"email\", u2.username, concat(u2.firstname, ' ', u2.lastname) as \"name\"  from report r\n" + 
    "inner join sector s on s.sectorid = r.report_current_sector\n" + 
    "inner join building b  on  b.buildingid = s.buildingid\n" + 
    "inner join city c on c.cityid = b.cityid\n" + 
    "inner join unity u on c.unityid = u.unityid\n" + 
    "inner join users u2 on u2.userid = current_user_id\n" + 
    " order by 5 desc";
}

function GetMyReports (data){
    return "\n" + 
    "select r.report_id, r.reportname , s.sectorname , r.updatedat, rs.status_nmndscr   from report r\n" + 
    "inner join sector s on s.sectorid = r.report_current_sector\n" + 
    "inner join building b  on  b.buildingid = s.buildingid\n" + 
    "inner join city c on c.cityid = b.cityid\n" + 
    "inner join unity u on c.unityid = u.unityid\n" + 
    "inner join users u2 on u2.userid = current_user_id\n" + 
    "inner join report_status rs on rs.status_id = r.current_status\n" +      String(data.userrole === '1' ? '' : `where u2.userid = ${data.userid}`) + " order by 4 desc"
}

function PostMyReport (data){
    return "INSERT INTO public.report\n" + 
    "(report_initial_sector, report_current_sector, updatedat, cratedat, previous_user_id, current_user_id, current_status,  reportname)\n" + 
    `VALUES((select sectorid from sector where sectoraka = '${data.sector}'), (select sectorid from sector where sectoraka = '${data.sector}') , CURRENT_DATE, CURRENT_DATE, ${data.user}, ${data.user}, 1, '${data.name}');\n`;
}


module.exports = {
    GetAllReports,
    GetMyReports,
    PostMyReport
}