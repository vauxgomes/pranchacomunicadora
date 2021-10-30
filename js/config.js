// Globals
let blocksModal = null;
let itemsModal = null;

// Printing Functions
function printBlocks(blocks) {
    let select = document.querySelector("#item-block");
    select.innerHTML = '<option value="" disabled selected>Escolha</option>';

    let tbody = document.querySelector("#blocks-table tbody");
    tbody.innerHTML = "";

    if (blocks.length > 0) {
        blocks.forEach((block) => {
            let tr = document.createElement("tr");
            tr.classList.add("align-middle");
            tr.innerHTML = `
                    	<td>
                    		<span class="px-3" style="background: ${block.color}"></span>
                    	</td>
                    	<td>${block.name}</td>
                    	<td>${block.order}</td>
                    	<td>${block.items.length}</td>
                    	<td class="text-end">
                            <button onclick="loadBlock(${block.id})" class="btn btn-sm btn-link"><span class="material-icons">edit_note</span></button>
                            <button onclick="deleteBlock(${block.id})" class="btn btn-sm btn-link"><span class="material-icons">clear</span></button>
                        </td>
                    `;

            tbody.append(tr);

            let opt = document.createElement("option");
            opt.innerText = block.name;
            opt.value = block.id;
            opt.disabled = block.items.length === 9;

            select.append(opt);
        });
    } else {
        tbody.innerHTML = `
                    <tr>
                    	<td colspan="1000" class="text-muted text-center small">
                    		Nenhuma Categoria Adicionada!
                    	</td>
                    </tr>`;
    }
}

function printItems(blocks) {
    let table = document.querySelector("#items-table");
    table.querySelectorAll("tbody").forEach((tbody) => tbody.remove());

    blocks.forEach((block) => {
        let tbody = document.createElement("tbody");

        block.items.forEach((item) => {
            let tr = document.createElement("tr");
            tr.classList.add("align-middle");
            tr.innerHTML = `
                    	<td>${block.name}</td>
                    	<td>${item.text}</td>
                    	<td><img src="${item.src}" width="30" alt="Image"/></td>
                    	<td>${item.order}</td>
                        <td class="text-end">
                            <button onclick="loadItem(${block.id}, ${item.id})" class="btn btn-sm btn-link"><span class="material-icons">edit_note</span></button>
                            <button onclick="deleteItem(${block.id}, ${item.id})" class="btn btn-sm btn-link"><span class="material-icons">clear</span></button>
                        </td>
                    `;

            tbody.append(tr);
        });

        table.append(tbody);
    });
}

function updateModificationSign(status) {
    let sign = document.querySelector("#modification-sign");

    if (status) {
        sign.classList.remove("d-none");
    } else {
        sign.classList.add("d-none");
    }
}

// Loading functions
function loadBlock(id) {
    let index = data.findIndex((b) => b.id == id);

    document.querySelector("#block-id").value = data[index].id;
    document.querySelector("#block-name").value = data[index].name;
    document.querySelector("#block-color").value = data[index].color;
    document.querySelector("#block-order").value = data[index].order;

    blocksModal.show();
}

function loadItem(blockId, id) {
    let blockIndex = data.findIndex((b) => b.id == blockId);
    let index = data[blockIndex].items.findIndex((i) => i.id == id);

    document.querySelector("#item-block").value = data[blockIndex].id;
    document.querySelector("#item-id").value = data[blockIndex].items[index].id;
    document.querySelector("#item-name").value =
        data[blockIndex].items[index].text;
    document.querySelector("#item-image-url").value =
        data[blockIndex].items[index].src;
    document.querySelector("#item-image-alt").value =
        data[blockIndex].items[index].alt;
    document.querySelector("#item-order").value =
        data[blockIndex].items[index].order;

    itemsModal.show();
}

// Delete functions
function deleteBlock(id) {
    let index = data.findIndex((b) => b.id == id);

    if (index === -1) {
        alert("Id inválido");
    }

    const ans = confirm(
        `Esta categoria possui ${data[index].items.length} iten(s). Todos os dados serão perdidos. Você realmente gostaria de removê-la?`
    );

    if (ans) {
        data.splice(index, 1);

        printBlocks(data);
        printItems(data);

        updateModificationSign(true);
    }
}

function deleteItem(blockId, id) {
    let blockIndex = data.findIndex((b) => b.id == blockId);
    let index = data[blockIndex].items.findIndex((i) => i.id == id);

    if (index === -1) {
        alert("Id inválido");
    }

    const ans = confirm("Você realmente gostaria de remover este item?");

    if (ans) {
        data[blockIndex].items.splice(index, 1);

        printBlocks(data);
        printItems(data);

        updateModificationSign(true);
    }

    updateModificationSign(true);
}

window.onload = () => {
    // Calls
    setRandomColor();

    printBlocks(data);
    printItems(data);

    // Modals
    blocksModal = new bootstrap.Modal("#blocks-modal");
    itemsModal = new bootstrap.Modal("#items-modal");

    // Trigger Buttons
    document
        .querySelector("#blocksModalTrigger")
        .addEventListener("click", () => {
            blocksModal.show();
        });

    document
        .querySelector("#itemsModalTrigger")
        .addEventListener("click", () => {
            itemsModal.show();
        });

    // Forms
    document.querySelector("#blocks-form").addEventListener("submit", (evt) => {
        evt.preventDefault();

        let block = {
            id: parseInt(document.querySelector("#block-id").value),
            name: document.querySelector("#block-name").value,
            color: document.querySelector("#block-color").value,
            order: document.querySelector("#block-order").value,
            items: [],
        };

        if (!block.id) {
            block.id = new Date().getTime();
            data.push(block);
        } else {
            let index = data.findIndex((b) => b.id == block.id);
            block.items = data[index].items;
            data[index] = block;
        }

        sortBlocks(data);
        printBlocks(data);
        updateModificationSign(true);

        blocksModal.hide();
    });

    document.querySelector("#items-form").addEventListener("submit", (evt) => {
        evt.preventDefault();

        let blockId = document.querySelector("#item-block").value;
        let blockIndex = data.findIndex((b) => b.id == blockId);

        let item = {
            id: parseInt(document.querySelector("#item-id").value),
            order: document.querySelector("#item-order").value,
            text: document.querySelector("#item-name").value,
            src: document.querySelector("#item-image-url").value,
            alt: document.querySelector("#item-image-alt").value,
        };

        if (!item.id) {
            item.id = new Date().getTime();
            data[blockIndex].items.push(item);
        } else {
            let index = data[blockIndex].items.findIndex(
                (i) => i.id == item.id
            );

            data[blockIndex].items[index] = item;
        }

        data[blockIndex].items = sortItems(data[blockIndex].items);

        printBlocks(data);
        printItems(data);
        updateModificationSign(true);

        itemsModal.hide();
    });

    // Download button
    DownloadButton(document.querySelector("#btn-download"), () => data);

    // Upload input
    InputReader(document.querySelector("#file-selector"), (text) => {
        data = JSON.parse(text);

        printBlocks(data);
        printItems(data);
        updateModificationSign(true);

        alert("Carregado com sucesso!");
    });
};

function setRandomColor() {
    document.querySelector("#block-color").value = randomHexColor();
}

// Save and load buttons
document.querySelector("#btn-save").addEventListener("click", () => {
    localStorage.setItem(DATA_NAME, JSON.stringify(data));
    updateModificationSign(false);
    alert("Salvo com sucesso!");
});

document.querySelector("#btn-load-basedata").addEventListener("click", () => {
    data = BASE_DATA;
    localStorage.setItem(DATA_NAME, JSON.stringify(data));

    printBlocks(data);
    printItems(data);
    updateModificationSign(false);
    alert("Carregado com sucesso!");
});
