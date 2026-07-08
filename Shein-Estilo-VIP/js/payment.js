let currentMember = null;

function getMember(phone){

    const members = DB.getMembers();

    return members.find(m=>m.phone===phone);

}

/* 查询会员 */

document.getElementById("searchBtn").onclick=function(){

    const phone=document.getElementById("phone").value.trim();

    currentMember=getMember(phone);

    if(!currentMember){

        alert("会员不存在");

        return;

    }

    document.getElementById("memberCard").innerHTML=`

    <h3>${currentMember.name}</h3>

    <p>手机号：${currentMember.phone}</p>

    <p>本金：C$${currentMember.balance.toFixed(2)}</p>

    <p>赠送：C$${currentMember.gift.toFixed(2)}</p>

    `;

}

/* 计算 */

document.getElementById("calcBtn").onclick=function(){

    if(!currentMember){

        alert("请先查询会员");

        return;

    }

    const payMoney=Number(document.getElementById("payMoney").value);

    if(payMoney<=0){

        alert("请输入正确金额");

        return;

    }

    /* 每满1000可抵100 */

    let maxGift=Math.floor(payMoney/1000)*100;

    /* 不能超过赠送余额 */

    let giftUse=Math.min(maxGift,currentMember.gift);

    let balanceUse=payMoney-giftUse;

    document.getElementById("result").innerHTML=`

    <h3>结算结果</h3>

    <p>消费金额：C$${payMoney.toFixed(2)}</p>

    <p>赠送抵扣：C$${giftUse.toFixed(2)}</p>

    <p>本金扣除：C$${balanceUse.toFixed(2)}</p>

    `;

}

/* 确认消费 */

document.getElementById("payBtn").onclick=function(){

    if(!currentMember){

        alert("请先查询会员");

        return;

    }

    const payMoney=Number(document.getElementById("payMoney").value);

    if(payMoney<=0){

        alert("请输入正确金额");

        return;

    }

    let members=DB.getMembers();

    let member=members.find(m=>m.id===currentMember.id);

    let maxGift=Math.floor(payMoney/1000)*100;

    let giftUse=Math.min(maxGift,member.gift);

    let balanceUse=payMoney-giftUse;

    if(member.balance<balanceUse){

        alert("本金余额不足");

        return;

    }

    /* 扣除本金 */

    member.balance-=balanceUse;

    /* 扣除赠送 */

    member.gift-=giftUse;

    /* 累计消费 */

    member.totalConsume+=payMoney;

    member.lastConsume=new Date().toLocaleString();

    DB.saveMembers(members);

    /* 写入记录 */

    let records=DB.getRecords();

    records.push({

        time:new Date().toLocaleString(),

        member:member.name,

        phone:member.phone,

        type:"消费",

        amount:payMoney,

        giftUsed:giftUse,

        balanceUsed:balanceUse

    });

    DB.saveRecords(records);

    alert("消费成功");

    location.reload();

}