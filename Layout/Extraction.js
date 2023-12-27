function HtmlLayout(data) {
    return ` <html>
    <head>
      <meta charset="utf-8">
      <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0; /* Remove default body margin */
        padding: 0; /* Remove default body padding */
      }
      td, th {
        border: 1px solid black;
        text-align: center;
        font-size: 13px;
        height: 21.1px;
        
      }
      table {
        width: 100%; /* Set the width to 100% */
        border-collapse: collapse;
        margin: 0; /* Remove default table margin */
      }
        .start{
          text-align: start;
        }
        .grey-bg{
          background-color: #d7d8d7;
        }
        .opacity-text{
          opacity: 0.9;
          font-size: 13px;
        }
        .end{
          text-align: end;
        }
        .grey-bg2{
          background-color: #bfbfbf;
        }
      </style>
    </head>
    
    <body>
      <table>
        <tr>
          <td rowspan="4" colspan="2"><img src="logo.png" width="90" height="70"></td>
          <th colspan="6">COMPANHIA DE SANEAMENTO DE ALAGOAS</th>
          <tr>
            <td colspan="5">GERÊNCIA DE CONTROLE DA QUALIDADE DO PRODUTO</td> <td>GEQPRO</td>
          </tr>
            <tr>
              <td colspan="5">Supervisão de Laborat. de Água RMM e Zona da Mata/Litoral</td> <td>SUPLAG-1</td>
          </tr>
        <tr>
          <td colspan="6">Rua Ver. José Raimundo dos Santos, S/N - Benedito Bentes - CEP: 57084-440</td>
        </tr>
        <tr>
          <td class="start" colspan="2">SOLICITANTE:</td>
          <td colspan="6">COMPANHIA DE SANEAMENTO DE ALAGOAS - CASAL</td>
        </tr>
        <tr>
          <td class="start" colspan="2">Endereco do Solicitante:</td>
          <td colspan="6">Rua Barão de Atalaia, 200 - Poço - Maceió - AL</td>
        </tr>
        <tr>
          <td class="start" colspan="2">LOCAL DA COLETA:</td>
          <td colspan="6"></td>
        </tr>
        <tr>
          <td class="start" colspan="2">BAIRRO/CIDADE:</td>
          <td colspan="6"></td>
        </tr>
        <tr>
          <td class="start" colspan="2">Data da Coleta:</td>
          <td colspan="3"></td>
          <td class="start" colspan="2">Entrada no Laborátorio:</td>
          <td colspan="1"></td>
        </tr>
        <tr>
          <td colspan="3" class="grey-bg">LAUDO DE ANÁLISE DE ÁGUA FÍSICO-QUÍMICO</td>
          <td colspan="2" class="start grey-bg">Coletor:</td>
          <td colspan="2" class="grey-bg opacity-text">Amostra Físico-química N°:</td>
          <td colspan="1" class="grey-bg"></td>
        </tr>
        <tr>
          <th style="width: 25px;">Nº</th>
          <th>Parâmetro</th>
          <th colspan="2" style="width: 200px;">Método</th>
          <th style="width: 115px;">Resultado</th>
          <th>VMP</th>
          <th>UNIDADE</th>
          <th>Conclusão</th>
        <tr>
          <td class="end">1</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
          </tr>
          <tr>
            <td class="end">2</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
          </tr>
          <tr>
            <td class="end">3</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
          </tr>
          <tr>
            <td class="end">4</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
          </tr>
          <tr>
            <td class="end">5</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
          </tr>
          <tr>
            <td class="end">6</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
          </tr>
        <tr>
          <td class="end">7</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">8</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">9</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">10</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">11</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">12</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">13</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">14</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">15</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">16</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">17</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">18</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">19</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">20</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">21</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">22</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">23</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">24</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
          <td class="end">25</td> <td></td> <td colspan="2"></td> <td></td> <td></td> <td></td> <td></td>
        </tr>
        <tr>
        <td colspan="3" class="grey-bg">LAUDO DE ANÁLISE DE ÁGUA MICROBIOLÓGICA</td>
        <td colspan="2" class="grey-bg start">Coletor:</td>
        <td colspan="2" class="grey-bg opacity-text">Amostra Bacteriológica N°:</td>
        <td colspan="1" class="grey-bg"></td>
        </tr>
        <tr>
          <td class="end">26</td> <td></td> <td colspan="2"></td> <td></td> <td colspan="2"></td> <td></td>
        </tr>
        <tr>
          <td class="end">27</td> <td></td> <td colspan="2"></td> <td></td> <td colspan="2"></td> <td></td>
        </tr>
        <tr>
          <td class="start opacity-text" style="background-color: #e0dede;" colspan="8">Referência Normativa - Portaria de Consolidação GM/MS n° 05 de 28 de setembro de 2017, Anexo XX alterado pela portaria GM/MS N° 888, de 4 de maio de 2021</td>
        </tr>
        <tr>
          <th class="start" colspan="2" style="padding-bottom: 16px;">CONCLUSÃO:</th>
          <td colspan="6"></td>
        </tr>
        <tr>
          <th class="start" colspan="2" style="padding-bottom: 36px;" >NOTAS:</th>
          <td class="start" colspan="6" style="font-size: 14px; padding-bottom: 36px;">1 - VMP: Valor Maximo Permitido; 2 - Presença = 1, Ausencia = 0; 3 - São de responsibilidade do requerente o plano an</td>
        </tr>
        <tr>
          <td class="grey-bg2 start" colspan="3">Chefia (GEQPRO):</td>
          <td class="grey-bg2 start" colspan="3">Chefia (SUPLAG-1):</td>
          <td colspan="2" class="grey-bg2 start">DATA:</td>
        </tr>
        <tr>
          <td colspan="3" style="padding: 40px;"></td>
          <td colspan="3"></td>
          <td colspan="2"></td>
        </tr>
      </table>
    </body>
    </html> `
}


module.exports = {
    HtmlLayout

}