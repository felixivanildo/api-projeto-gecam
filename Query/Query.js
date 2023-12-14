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


function updateUser(data) {
    return (
      "UPDATE public.users SET\n" +
      `  firstname = '${data.firstName}',\n` +
      `  lastname = '${data.lastName}',\n` +
      `  phone = ${data.phone},\n` +
      `  sectorid = (SELECT sectorid FROM sector WHERE sectoraka = '${data.state}'),\n` +
      `  buildingid = (select buildingid from sector where sectoraka = '${data.state}'), \n`  +
      `  updatedat = CURRENT_DATE,\n` +
      `  username = '${data.email}',\n` +
      `  jobttitle = '${data.jobtitle}',\n` +
      `  isactive = ${data.isactive}\n` +
      `WHERE userid = ${data.id};\n`
    );
  }


function GetExclusiveReport(data){
    return "\n" + 
    "SELECT r.*,\n" + 
    "rm.fq_ph as \"fq_PH\",\n" + 
    "rm.fq_cor_verdadeira as \"fq_COR VERDADEIRA\",\n" + 
    "rm.fq_turbidez as \"fq_TURBIDEZ\",\n" + 
    "rm.fq_condutancia_especifica as \"fq_CONDUTANCIA ESPECIFICA\",\n" + 
    "rm.fq_acidez as \"fq_ACIDEZ\",\n" + 
    "rm.fq_alcalinidade_oh as \"fq_ALCALINIDADE OH\",\n" + 
    "rm.fq_alcalinidade_co as \"fq_ALCALINIDADE CO\",\n" + 
    "rm.fq_alcalinidade_hco as \"fq_ALCALINIDADE HCO\",\n" + 
    "rm.fq_dureza_total as \"fq_DUREZA TOTAL\",\n" + 
    "rm.fq_dureza_carbonatos as \"fq_DUREZA CARBONATOS\",\n" + 
    "rm.fq_dureza_ncarbonatos as \"fq_DUREZA NÃO CARBONATOS\",\n" + 
    "rm.fq_calcio as \"fq_CALCIO\",\n" + 
    "rm.fq_magnesio as \"fq_MAGNESIO\",\n" + 
    "rm.fq_cloretos as \"fq_CLORETOS\",\n" + 
    "rm.fq_silica as \"fq_SILICA\",\n" + 
    "rm.fq_sulfato as \"fq_SULFATO\",\n" + 
    "rm.fq_amonia as \"fq_AMÔNIA\",\n" + 
    "rm.fq_nitrato as \"fq_NITRATO\",\n" + 
    "rm.fq_nitrito as \"fq_NITRITO\",\n" + 
    "rm.fq_ferro_total as \"fq_FERRO TOTAL\",\n" + 
    "rm.fq_sodio as \"fq_SÓDIO\",\n" + 
    "rm.fq_potassio as \"fq_POTASSIO\",\n" + 
    "rm.fq_solidos_totais as \"fq_SOLIDOS TOTAIS\",\n" + 
    "rm.fq_coliformes_totais as \"fq_COLIFORMES TOTAIS\",\n" + 
    "rm.fq_escherichia_coli as \"fq_ESCHERICHIA COLI\",\n" + 
    "rm.fq_indice_nitrato_nitrito as \"fq_INDICE NITRATO NITRITO\",\n" + 
    "rm.fq_cloro_residual_livre as \"fq_CLORO RESIDUAL LIVRE\",\n" + 
    "rc.clr_observacao_do_ambiente as \"clr_OBSERVAÇÃO DO AMBIENTE\",\n" + 
    "rc.clr_entrada_no_laboratorio as \"clr_ENTRADA NO LABORATORIO\",\n" + 
    "rc.clr_condicao_da_amostra as \"clr_CONDICAO DA AMOSTRA\",\n" + 
    "rc.clr_inicio_analise as \"clr_INICIO ANALISE\",\n" + 
    "rc.clr_termino_analise as \"clr_TERMINO ANALISE\",\n" + 
    "rc.clr_volume_filtrado as \"clr_VOLUME FILTRADO\",\n" + 
    "rc.clr_procedencia as \"clr_PROCEDÊNCIA\",\n" + 
    "rc.clr_resultado as \"clr_RESULTADO\",\n" + 
    "rb.bc_cor as \"bc_COR\",\n" + 
    "rb.bc_turbidez as \"bc_TURBIDEZ\",\n" + 
    "rb.bc_cloro_residual_livre as \"bc_CLORO RESIDUAL LIVRE\",\n" + 
    "rb.bc_coliformes_totais as \"bc_COLIFORMES TOTAIS\",\n" + 
    "rb.bc_escherichia_coli as \"bc_ESCHERICHIA COLI\",\n" + 
    "rb.bc_ph as \"bc_PH\"\n" + 
    "FROM report r\n" + 
    "left join report_measurings rm on rm.reportid = r.report_id\n" + 
    "left join report_bacteriologica rb on rb.reportid = r.report_id\n" + 
    "left join report_clorofila rc on rc.reportid = r.report_id\n" + 
    `where r.report_id = ${data} ;\n`;;
}



function InsertBuilding (data) {
    return "\n" + 
    "INSERT INTO public.building\n" + 
    "(buildingname, buildingaka, cityid, updatedat, isactive)\n" + 
    `VALUES('${String(data.nomePredio).toUpperCase()}', '${String(data.nomeAbreviado).toUpperCase()}', ${data.Cidade.id}, CURRENT_DATE, ${data.switchFieldName});\n`;
}

function InsertSector (data) {
    return "\n" + 
    "INSERT INTO public.sector\n" + 
    "(sectorname, sectoraka, updatedat, buildingid, isactive)\n" + 
    `VALUES('${String(data.nomeSetor).toUpperCase()}', '${String(data.nomeAbreviado).toUpperCase()}', CURRENT_DATE, ${data.Predio.id}, true);\n`;
}
  
module.exports = {
    GetAllReports,
    GetMyReports,
    PostMyReport,
    updateUser,
    GetExclusiveReport,
    InsertBuilding,
    InsertSector

}