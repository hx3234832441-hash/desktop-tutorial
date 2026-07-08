function loadMembers(keyword = "") {

    const members = DB.getMembers();

    const tbody = document.getElementById("memberTable");

    tbody.innerHTML = "";

    members
        .filter(m =>
            m.name.includes(keyword) ||
            m.phone.includes(keyword)
        )
        .forEach(member => {

            tbody.innerHTML += `
            <tr>

                <td>${member.id}</td>

                <td>${member.name}</td>

                <td>${member.phone}</td>

                <td>C$${member.balance}</td>

                <td>C$${member.gift}</td>

                <td>

                    <button onclick="editMember('${member.id}')">

                    编辑

                    </button>

                    <button onclick="deleteMember('${member.id}')">

                    删除

                    </button>

                </td>

            </tr>
            `;

        });

}

document.getElementById("addMember").onclick = function () {

    const name = document.getElementById("name").value.trim();

    const phone = document.getElementById("phone").value.trim();

    if (!name || !phone) {

        alert("请输入姓名和手机号");

        return;

    }

    let members = DB.getMembers();

    if (members.find(m => m.phone === phone)) {

        alert("手机号已存在");

        return;

    }

    members.push({

        id: DB.newId(),

        name,

        phone,

        balance: 0,

        gift: 0,

        totalRecharge: 0,

        totalConsume: 0,

        createTime: new Date().toLocaleString()

    });

    DB.saveMembers(members);

    document.getElementById("name").value = "";

    document.getElementById("phone").value = "";

    loadMembers();

};

function deleteMember(id) {

    if (!confirm("确认删除会员？")) return;

    let members = DB.getMembers();

    members = members.filter(m => m.id !== id);

    DB.saveMembers(members);

    loadMembers();

}

function editMember(id) {

    let members = DB.getMembers();

    let member = members.find(m => m.id === id);

    const name = prompt("姓名", member.name);

    if (!name) return;

    member.name = name;

    DB.saveMembers(members);

    loadMembers();

}

document.getElementById("searchBtn").onclick = function () {

    loadMembers(document.getElementById("search").value);

};

loadMembers();