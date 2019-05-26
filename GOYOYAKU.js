var reserveid = '';
var toDay = '';
var pageNo = 1;
var pageNoC = 1;
const pageCnt = 10;
// 予約一覧の表示
function setList() {
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  var mySql = "SELECT reserveid,customer,delegate,DATE_FORMAT(reservedate,'%Y/%m/%d'),status FROM reserve_tbl ORDER BY reservedate DESC,visitdate DESC";
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  try {
    rs.Open(mySql, cn);
  } catch (e) {
    cn.Close();
    alert('対象テーブル検索不能' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    return;
  }
  if (toDay == '') {
    var date = new Date();
    toDay = date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2);
  }
  if (rs.EOF){
    rs.Close();
    cn.Close();
    rs = null;
    cn = null;
    clrScr();
    $('#tabs').tabs( { active: 1} );
    return;
  }
  var strYMD = '';
  var strDoc = '';
  var itemNo = 0;
  while (!rs.EOF){
    itemNo = itemNo + 1;
    if ((itemNo > (pageNo - 1) * pageCnt) && itemNo < (pageNo * pageCnt) + 1){
      strDoc  += '<tr><td width="150px">';
      strDoc  += '<a href="#" onClick=updPage("' + rs(0).value + '")>' + rs(0).value + '</a></td>';
      strYMD = rs(3).value;
      if (strYMD < '2000/01/01') { strYMD = ''; }
      var strDelegate = rs(2).value;
      if (strDelegate == null) { strDelegate = ''; }
      strDoc += '<td width="470px">' + rs(1).value + '</td><td width="410px">' + strDelegate + '</td>';
      strDoc += '<td width="110px">' + strYMD + '</td>';
      switch (rs(4).value){
        case 0: strDoc += '<td width="75px">予約</td></tr>';
                break;
        case 1: strDoc += '<td width="75px">保留</td></tr>';
                break;
        case 2: strDoc += '<td width="75px"><font color="red">来店中</font></td></tr>';
                break;
        case 3: strDoc += '<td width="75px">済み</td></tr>';
                break;
        case 4: strDoc += '<td width="75px">ｷｬﾝｾﾙ</td></tr>';
                break;
        case 9: strDoc += '<td width="75px">その他</td></tr>';
                break;
      }
    }
    rs.MoveNext();
  }
  $('#lst01').replaceWith('<tbody id="lst01" style="height: 500px">' + strDoc + '</tbody>');
  rs.Close();
  cn.Close();
  rs = null;
  cn = null;
  strDoc = '';
  if (pageNo > 1){ strDoc = '<a href="#" onclick="befPage();">≪前の' + pageCnt + '件へ</a>'; }
  if (pageNo * pageCnt < itemNo){ strDoc += '　<a href="#" onclick="nextPage();">次の' + pageCnt + '件へ≫</a>'; }  
  if (strDoc != ''){ $('#footer').replaceWith('<div id="footer">' + strDoc + '</div>'); }  
  clrScr();
  $('#tabs').tabs( { active: 0} );
}
// コース一覧の表示
function setCourseList() {
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  var mySql = "SELECT courseid,coursename,unitprice,setnum,IfNull(DATE_FORMAT(credate,'%Y/%m/%d'),''),delflg FROM course_mst ORDER BY credate DESC";
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  try {
    rs.Open(mySql, cn);
  } catch (e) {
    cn.Close();
    alert('対象テーブル検索不能' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    return;
  }
  if (rs.EOF){
    rs.Close();
    cn.Close();
    rs = null;
    cn = null;
    clrCourse();
    return;
  }
  var strYMD = '';
  var strDoc = '';
  var itemNo = 0;
  while (!rs.EOF){
    itemNo = itemNo + 1;
    if ((itemNo > (pageNoC - 1) * pageCnt) && itemNo < (pageNoC * pageCnt) + 1){
      strDoc += '<tr><td width="100px"><a href="#" onClick=updPageC("' + rs(0).value + '")>' + rs(0).value + '</a></td>';
      strDoc += '<td width="500px">' + rs(1).value + '</td>';
      strDoc += '<td width="100px" align="right">' + rs(2).value + '</td>';
      strDoc += '<td width="100px" align="right">' + rs(3).value + '</td>';
      strYMD = rs(4).value;
      if (strYMD < '2000/01/01') { strYMD = ''; }
      strDoc += '<td width="110px">' + strYMD + '</td>';
      if (rs(5).value == 1) {
         strDoc += '<td width="60px"><font color="red">廃止</font></td></tr>';
      } else {
         strDoc += '<td width="60px">　　</td></tr>';
      }
    }
    rs.MoveNext();
  }
  $('#lst03').replaceWith('<tbody id="lst03" style="height: 500px">' + strDoc + '</tbody>');
  rs.Close();
  cn.Close();
  rs = null;
  cn = null;
  strDoc = '';
  if (pageNoC > 1){ strDoc = '<a href="#" onclick="befPageC();">≪前の' + pageCnt + '件へ</a>'; }
  if (pageNoC * pageCnt < itemNo){ strDoc += '　<a href="#" onclick="nextPageC();">次の' + pageCnt + '件へ≫</a>'; }  
  if (strDoc != ''){ $('#footerC').replaceWith('<div id="footerC">' + strDoc + '</div>'); }  
  clrCourse();
  $('#tabs').tabs( { active: 2} );
}
// 予約一覧の次ページ
function nextPage() {
  pageNo = pageNo + 1;
  setList();
}
// 予約一覧の前ページ
function befPage() {
  pageNo = pageNo - 1;
  setList();
}
// コース一覧の次ページ
function nextPageC() {
  pageNoC = pageNoC + 1;
  setCourseList();
}
// コース一覧の前ページ
function befPageC() {
  pageNoC = pageNoC - 1;
  setCourseList();
}
// 新規予約ページクリア
function clrScr() {
  setSelBox();
  setOrderImg(0);
  $('#reserveid').val(getNewNo());
  $('#reservedate').val('');
  $('#visitdate').val('');
  $('#visittime').val('');
  $('#status').val(0);
  $('#customer').val('');
  $('#delegate').val('');
  $('#telnum').val('');
  $('#postnum').val('');
  $('#address').val('');
  $('#email').val('');
  $('#reservenum').val('');
  $('#order1').val('');
  $('#ordernum1').val(0);
  $('#order2').val('');
  $('#ordernum2').val('');
  $('#order3').val('');
  $('#ordernum3').val('');
  $('#order4').val('');
  $('#ordernum4').val('');
  $('#order5').val('');
  $('#ordernum5').val('');
  $('#response').val(0);
  $('#evaluation').val(0);
  $('#remarks').val('');
  $('#receptdate').val(toDay);
  $('#receptionist').val('');
  $('#lbl02').replaceWith('<div id="lbl02">予約新規</div>');
  $('#insert').show();
  $('#update').hide();
  $('#delete').hide();
  $('#clear').hide();
  $('#reserveid').prop('disabled', false);
}
// 新規コースページクリア
function clrCourse() {
  $('#courseid').val('');
  $('#delflg').val('');
  $('#coursename').val('');
  $('#description').val('');
  $('#courseimg').val('');
  $('#unitprice').val(0);
  $('#setnum').val(0);
  $('#credate').val(toDay);
  $('#deldate').val('');
  $('#remarksC').val('');
  $('#lbl04').replaceWith('<div id="lbl04">コース新規</div>');
  $('#insertC').show();
  $('#updateC').hide();
  $('#deleteC').hide();
  $('#clearC').hide();
  $('#courseid').prop('disabled', false);
}
// 予約詳細ページの表示
function updPage(id) {
  reserveid = id;
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  mySql = "SELECT DATE_FORMAT(reservedate,'%Y/%m/%d'),"
            + "DATE_FORMAT(visitdate,'%Y/%m/%d'),"
            + "TIME_FORMAT(visittime,'%H:%i:%s'),"
            + "DATE_FORMAT(receptdate,'%Y/%m/%d'),"
            + "reserveid,status,customer,delegate,telnum,postnum,"
            + "address,email,reservenum,order1,ordernum1,order2,ordernum2,"
            + "order3,ordernum3,order4,ordernum4,order5,ordernum5,"
            + "response,evaluation,remarks,receptionist"
            + " FROM reserve_tbl WHERE reserveid = '" + reserveid + "'";
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  try {
    rs.Open(mySql, cn);
  } catch (e) {
    cn.Close();
    document.write('対象レコード検索不能' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    alert('対象レコード検索不能');
    return;
  }
  reserveid = rs(4).value;
  if (!rs.EOF){
    $('#reserveid').val(reserveid);
    $('#reservedate').val(rs(0).value);
    $('#visitdate').val(rs(1).value);
    $('#visittime').val(rs(2).value);
    $('#receptdate').val(rs(3).value);
    $("#status").val(rs(5).value);
    $('#customer').val(rs(6).value);
    $('#delegate').val(rs(7).value);
    $('#telnum').val(rs(8).value);
    $('#postnum').val(rs(9).value);
    $('#address').val(rs(10).value);
    $('#email').val(rs(11).value);
    $('#reservenum').val(rs(12).value);
    $('#order1').val(rs(13).value);
    $('#ordernum1').val(rs(14).value);
    $('#order2').val(rs(15).value);
    $('#ordernum2').val(rs(16).value);
    $('#order3').val(rs(17).value);
    $('#ordernum3').val(rs(18).value);
    $('#order4').val(rs(19).value);
    $('#ordernum4').val(rs(20).value);
    $('#order5').val(rs(21).value);
    $('#ordernum5').val(rs(22).value);
    $('#response').val(rs(23).value);
    $('#evaluation').val(rs(24).value);
    $('#remarks').val(rs(25).value);
    $('#receptionist').val(rs(26).value);
    if ($('#order1').val() == null) {
      setOrderImg(0);
    } else {
      setOrderImg(1);
    }
  }
  $('#lbl02').replaceWith('<div id="lbl02">予約詳細</div>');
  rs.Close();
  cn.Close();
  rs = null;
  cn = null;
  $('#insert').hide();
  $('#update').show();
  $('#delete').show();
  $('#clear').show();
  $('#reserveid').prop('disabled', true);
  $('#tabs').tabs( { active: 1} );
}
// コース詳細ページの表示
function updPageC(Cid) {
  courseid = Cid;
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  mySql = "SELECT courseid,delflg,coursename,description,courseimg,unitprice,setnum,"
            + "IfNull(DATE_FORMAT(credate,'%Y/%m/%d'),''),"
            + "IfNull(DATE_FORMAT(deldate,'%Y/%m/%d'),''),"
            + "remarks"
            + " FROM course_mst WHERE courseid = '" + courseid + "'";
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  try {
    rs.Open(mySql, cn);
  } catch (e) {
    cn.Close();
    document.write('対象レコード検索不能' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    alert('対象レコード検索不能');
    return;
  }
  if (!rs.EOF){
    $('#courseid').val(courseid);
    $('#delflg').val(rs(1).value);
    $('#coursename').val(rs(2).value);
    $('#description').val(rs(3).value);
    $("#courseimg").val(rs(4).value);
    $('#unitprice').val(rs(5).value);
    $('#setnum').val(rs(6).value);
    $('#credate').val(rs(7).value);
    $('#deldate').val(rs(8).value);
    $('#remarksC').val(rs(9).value);
    if (rs(4).value !== '') {
       $('#Cimg').replaceWith('<div id="Cimg"><img src="./image/' + rs(4).value + '" align="left" width="500"></div>');
    }
  }
  $('#lbl04').replaceWith('<div id="lbl04">コース詳細</div>');
  rs.Close();
  cn.Close();
  rs = null;
  cn = null;
  $('#insertC').hide();
  $('#updateC').show();
  $('#deleteC').show();
  $('#clearC').show();
  $('#courseid').prop('disabled', true);
  $('#tabs').tabs( { active: 3} );
}
// 予約の更新
function updRec() {
  if (reserveid == '') { alert('予約NOが、セットされていません！'); return; }
  if ( !inpCheck() ) { return; }
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  var mySql = "UPDATE reserve_tbl SET ";
  mySql +=  "reservedate = " + getVal('reservedate');
  mySql += ",visitdate = "   + getVal('visitdate');
  mySql += ",visittime = "   + getVal('visittime');
  mySql += ",status = "      + getNum('status');
  mySql += ",customer = "    + getVal('customer');
  mySql += ",delegate = "    + getVal('delegate');
  mySql += ",telnum = "      + getVal('telnum');
  mySql += ",postnum = "     + getVal('postnum');
  mySql += ",address = "     + getVal('address');
  mySql += ",email = "       + getVal('email');
  mySql += ",reservenum = "  + getNum('reservenum');
  mySql += ",order1 = "      + getVal('order1');
  mySql += ",ordernum1 = "   + getNum('ordernum1');
  mySql += ",order2 = "      + getVal('order2');
  mySql += ",ordernum2 = "   + getNum('ordernum2');
  mySql += ",order3 = "      + getVal('order3');
  mySql += ",ordernum3 = "   + getNum('ordernum3');
  mySql += ",order4 = "      + getVal('order4');
  mySql += ",ordernum4 = "   + getNum('ordernum4');
  mySql += ",order5 = "      + getVal('order5');
  mySql += ",ordernum5 = "   + getNum('ordernum5');
  mySql += ",response = "    + getNum('response');
  mySql += ",evaluation = "  + getNum('evaluation');
  mySql += ",remarks = "     + getVal('remarks');
  mySql += ",receptdate = "  + getVal('receptdate');
  mySql += ",receptionist = " + getVal('receptionist');
  mySql += " WHERE reserveid = '" + reserveid + "'";
  try {
    var rs = cn.Execute(mySql);
    alert('対象レコード更新完了');
  } catch (e) {
    cn.Close();
    alert('対象レコード更新失敗 ' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    return;
  }
  cn.Close();
  rs = null;
  cn = null;
  setList();
}
// コースの更新
function updCourse() {
  if (courseid == '') { alert('コースIDがセットされていません！'); return; }
  if ( !inpCheckC() ) { return; }
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  var mySql = "UPDATE course_mst SET ";
  mySql +=  "delflg = "      + getNum('delflg');
  mySql += ",coursename = "  + getVal('coursename');
  mySql += ",description = " + getVal('description');
  mySql += ",courseimg = "   + getVal('courseimg');
  mySql += ",unitprice = "   + getNum('unitprice');
  mySql += ",setnum = "      + getNum('setnum');
  mySql += ",credate = "     + getVal('credate');
  mySql += ",deldate = "     + getVal('deldate');
  mySql += ",remarks = "     + getVal('remarksC');
  mySql += " WHERE courseid = '" + courseid + "'";
  try {
    var rs = cn.Execute(mySql);
    alert('対象レコード更新完了');
  } catch (e) {
    cn.Close();
    alert('対象レコード更新失敗 ' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    return;
  }
  cn.Close();
  rs = null;
  cn = null;
  setCourseList();
}
// 予約の登録
function insRec() {
  reserveid = $('#reserveid').val(); 
  if ( !inpCheck() ) { return; }
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  var mySql  = "INSERT INTO reserve_tbl(reserveid,reservedate,visitdate,visittime,status,";
  mySql += "customer,delegate,telnum,postnum,address,email,reservenum,";
  mySql += "order1,ordernum1,order2,ordernum2,order3,ordernum3,order4,ordernum4,order5,ordernum5,";
  mySql += "response,evaluation,remarks,receptdate,receptionist)";
  mySql += " VALUES(";
  mySql += "'" + reserveid + "'";
  mySql += "," + getVal('reservedate');
  mySql += "," + getVal('visitdate');
  mySql += "," + getVal('visittime');
  mySql += "," + getNum('status');
  mySql += "," + getVal('customer');
  mySql += "," + getVal('delegate');
  mySql += "," + getVal('telnum');
  mySql += "," + getVal('postnum');
  mySql += "," + getVal('address');
  mySql += "," + getVal('email');
  mySql += "," + getNum('reservenum');
  mySql += "," + getVal('order1');
  mySql += "," + getNum('ordernum1');
  mySql += "," + getVal('order2');
  mySql += "," + getNum('ordernum2');
  mySql += "," + getVal('order3');
  mySql += "," + getNum('ordernum3');
  mySql += "," + getVal('order4');
  mySql += "," + getNum('ordernum4');
  mySql += "," + getVal('order5');
  mySql += "," + getNum('ordernum5');
  mySql += "," + getNum('response');
  mySql += "," + getNum('evaluation');
  mySql += "," + getVal('remarks');
  mySql += "," + getVal('receptdate');
  mySql += "," + getVal('receptionist') + ")";
  try {
    var rs   = cn.Execute(mySql);
    alert('対象レコード登録完了');
  } catch (e) {
    cn.Close();
    if ((e.number & 0xFFFF) == '3604') {
      alert('対象レコードは、既に登録されています。KEY=[' + reserveid + ']');
      updPage(reserveid);
    } else {
      alert('対象レコード登録失敗 ' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    }
    return;
  }
  cn.Close();
  rs = null;
  cn = null;
  clrScr();
  setList();
}
// コースの登録
function insCourse() {
  courseid = $('#courseid').val(); 
  if ( !inpCheckC() ) { return; }
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  var mySql  = "INSERT INTO course_mst(courseid,delflg,coursename,";
  mySql += "description,courseimg,unitprice,setnum,credate,deldate,remarks)";
  mySql += " VALUES(";
  mySql += "'" + courseid + "'";
  mySql += "," + getNum('delflg');
  mySql += "," + getVal('coursename');
  mySql += "," + getVal('description');
  mySql += "," + getVal('courseimg');
  mySql += "," + getNum('unitprice');
  mySql += "," + getNum('setnum');
  mySql += "," + getVal('credate');
  mySql += "," + getVal('deldate');
  mySql += "," + getVal('remarksC') + ")";
  try {
    var rs   = cn.Execute(mySql);
    alert('対象レコード登録完了');
  } catch (e) {
    cn.Close();
    if ((e.number & 0xFFFF) == '3604') {
      alert('対象レコードは、既に登録されています。KEY=[' + courseid + ']');
      updPage(reserveid);
    } else {
      alert('対象レコード登録失敗 ' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    }
    return;
  }
  cn.Close();
  rs = null;
  cn = null;
  clrCourse();
  setCourseList();
}
// 予約の削除
function delRec() {
  if (reserveid == '') { alert('予約NOがセットされていません！'); return; }
  var cn = new ActiveXObject('ADODB.Connection');
  if( confirm('本当に削除しますか？')) {
  } else {
    alert('削除キャンセルしました！');
    return;
  }
  var rs = new ActiveXObject('ADODB.Recordset');
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  var mySql = "DELETE FROM reserve_tbl WHERE reserveid = '" + reserveid + "'";
  try {
    var rs = cn.Execute(mySql);
    alert('対象レコード削除完了');
  } catch (e) {
    cn.Close();
    alert('対象レコード削除失敗 ' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    return;
  }
  cn.Close();
  rs = null;
  cn = null;
  setList();
}
// コースの削除
function delCourse() {
  if (courseid == '') { alert('コースIDがセットされていません！'); return; }
  var cn = new ActiveXObject('ADODB.Connection');
  if( confirm('本当に削除しますか？')) {
  } else {
    alert('削除キャンセルしました！');
    return;
  }
  var rs = new ActiveXObject('ADODB.Recordset');
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  var mySql = "DELETE FROM course_mst WHERE courseid = '" + courseid + "'";
  try {
    var rs = cn.Execute(mySql);
    alert('対象レコード削除完了');
  } catch (e) {
    cn.Close();
    alert('対象レコード削除失敗 ' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    return;
  }
  cn.Close();
  rs = null;
  cn = null;
  setCourseList();
}
// 予約入力チェック
function inpCheck () {
  $('#reserveid').css('backgroundColor','#FFFFFF');
  $('#customer').css('backgroundColor','#FFFFFF');
  $('#reservedate').css('backgroundColor','#FFFFFF');
  $('#visitdate').css('backgroundColor','#FFFFFF');
  $('#receptdate').css('backgroundColor','#FFFFFF');
  $('#ordernum1').css('backgroundColor','#FFFFFF');
  if (reserveid == '') { return atError ( 'reserveid', '予約NOは、必須入力項目です！'); }
  if (getVal('customer') == 'null') { return atError ( 'customer', '予約名は、必須入力項目です！'); }
  if (getVal('reservedate') == 'null') { return atError ( 'reservedate', '予約日は、必須入力項目です！'); }
  if ( isNaN(getNum('ordernum1')) ) { return atError ( 'ordernum1', '数値を入力してください！'); }
  if ( !isDate($('#reservedate').val())) { 
    return atError ( 'reservedate', '予約日の日付形式が正しくありません！ ' + getVal('reservedate'));
  }
  if ( !isDate($('#visitdate').val())) { 
    return atError ( 'visitdate', '来店日の日付形式が正しくありません！' + getVal('visitdate'));
  }
  if ( !isDate($('#receptdate').val())) { 
    return atError ( 'receptdate', '受付日の日付形式が正しくありません！' + getVal('receptdate'));
  }
  return true;
}
// コース入力チェック
function inpCheckC () {
  $('#courseid').css('backgroundColor','#FFFFFF');
  $('#coursename').css('backgroundColor','#FFFFFF');
  $('#credate').css('backgroundColor','#FFFFFF');
  $('#deldate').css('backgroundColor','#FFFFFF');
  $('#unitprice').css('backgroundColor','#FFFFFF');
  $('#setnum').css('backgroundColor','#FFFFFF');
  if (courseid == '') { return atError ( 'courseid', 'コースIDは、必須入力項目です！'); }
  if (getVal('coursename') == 'null') { return atError ( 'coursename', 'コース名は、必須入力項目です！'); }
  if ( isNaN(getNum('unitprice')) ) { return atError ( 'unitprice', '数値を入力してください！'); }
  if ( isNaN(getNum('setnum')) ) { return atError ( 'isetnum', '数値を入力してください！'); }
  if ( !isDate($('#credate').val())) { 
    return atError ( 'deldate', '開始日の日付形式が正しくありません！ ' + getVal('deldate'));
  }
  if ( !isDate($('#deldate').val())) { 
    return atError ( 'deldate', '入手日の日付形式が正しくありません！ ' + getVal('deldate'));
  }
  return true;
}
// エラー処理
function atError ( str, msg ) {
  alert(msg);
  $('#' + str).focus();
  $('#' + str).css('backgroundColor','mistyrose');
  return false;
}
// 日付フォーマットチェック
function isDate ( strDate ) {
  if (strDate == '') return true;
  if(!strDate.match(/^\d{4}\/\d{1,2}\/\d{1,2}$/)){
    return false;
  } 
  var date = new Date(strDate);  
  if(date.getFullYear() !=  strDate.split('/')[0] 
    || date.getMonth() != strDate.split('/')[1] - 1 
    || date.getDate() != strDate.split('/')[2]){
    return false;
  } else {
    return true;
  }
}
// 文字項目編集(for SQL)
function getVal ( str ) {
  var tmp = $('#' + str).val();
  if (tmp == '' || tmp == null) {
    return 'null';
  } else {
    return "'" + tmp + "'";
  }
}
// 数字項目編集(for SQL)
function getNum ( str ) {
  var tmp = $('#' + str).val();
  if (tmp == '' || tmp == null) {
    return 'null';
  } else {
    return + tmp;
  }
}
// 新予約番号採番
function getNewNo() {
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  var mySql = "SELECT MAX(reserveid) FROM reserve_tbl";
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  try {
    rs.Open(mySql, cn);
  } catch (e) {
    cn.Close();
    alert('対象テーブル検索不能' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    return;
  }
  var date = new Date();
  var YMD = ('0' + date.getFullYear()).slice(-2) + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);
  var NewNo = YMD * 1000 + 1;
  if (!rs.EOF){
    var maxNo = rs(0).value;
    if (YMD == maxNo.slice(0,6)) {
      NewNo += 1;
    }
  }
  rs.Close();
  cn.Close();
  rs = null;
  cn = null;
  return NewNo;
}
// コース選択ボックス値セット
function setSelBox() {
  var cn = new ActiveXObject('ADODB.Connection');
  var rs = new ActiveXObject('ADODB.Recordset');
  var mySql = "SELECT courseid,coursename FROM course_mst"
            + " WHERE delflg = 0 ORDER BY courseid";
  cn.Open('Provider=MSDASQL; Data Source=Connector_MariaDB');
  try {
    rs.Open(mySql, cn);
  } catch (e) {
    cn.Close();
    alert('対象テーブル検索不能' + (e.number & 0xFFFF) + ' ' + e.message + ' ' + mySql);
    return;
  }
  var strDoc = '';
  while (!rs.EOF){
    strDoc += '<option value="' + rs(0).value + '">' + rs(1).value + '</option>'
    rs.MoveNext();
  }
  rs.Close();
  cn.Close();
  $('#order1').replaceWith('<select name="order1" id="order1" onchange="setOrderImg(1)">' + strDoc + '</select>');
  $('#order2').replaceWith('<select name="order2" id="order2" onchange="setOrderImg(2)">' + strDoc + '</select>');
  $('#order3').replaceWith('<select name="order3" id="order3" onchange="setOrderImg(3)">' + strDoc + '</select>');
  $('#order4').replaceWith('<select name="order4" id="order4" onchange="setOrderImg(4)">' + strDoc + '</select>');
  $('#order5').replaceWith('<select name="order5" id="order5" onchange="setOrderImg(5)">' + strDoc + '</select>');
}
// コース選択ボックス画像表示
function setOrderImg(Onum) {
  if (Onum == 0) {
    $('#Oimg1').replaceWith('<div id="Oimg1"></div>');
  } else {
    var img = $('#order' + Onum).val();
    $('#Oimg1').replaceWith('<div id="Oimg1"><img src="./image/' + img + '.jpg" height="225"></div>');
  }
}
