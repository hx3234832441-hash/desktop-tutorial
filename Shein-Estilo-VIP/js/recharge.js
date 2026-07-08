function findMember(phone){

    return DB.getMembers().find(m=>m.phone===phone);

}

document.getElementById("findMember").onclick=function(){

    const phone=document.getElementById("phone").value;

    const member=findMember(phone);

    if(!member){

        alert("会员不存在");

        return;

    }

    window.member=member;

    document.getElementById("memberInfo").innerHTML=`

        <h3>${member.name}</h3>

        <p>本金：C$${member.balance}</p>

        <p>赠送：C$${member.gift}</p>

    `;

};

document.getElementById("rechargeBtn").onclick=function(){

    if(!window.member){

        alert("请先查询会员");

        return;

    }

    const money=Number(document.getElementById("money").value);

    if(money<=0){

        alert("请输入正确金额");

        return;

    }

    let members=DB.getMembers();

    let m=members.find(v=>v.id===window.member.id);

    /* 本金 */

    m.balance+=money;

    /* 赠送 */

    m.gift+=money;

    m.totalRecharge+=money;

    DB.saveMembers(members);

    let records=DB.getRecords();

    records.push({

        time:new Date().toLocaleString(),

        type:"充值",

        member:m.name,

        money:money,

        gift:money

    });

    DB.saveRecords(records);

    alert("充值成功\n赠送："+money);

    location.reload();

};