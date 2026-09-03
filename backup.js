/* ============================================================
   backup.js
   Export/import all shop data (inventory, bills, customers,
   expenses, shop settings) as a downloadable .json file.
   Relies on globals defined in app.js: DATA, state, saveData, render, showToast.
   ============================================================ */

function downloadBackup(){
  try{
    const dataStr = JSON.stringify(DATA, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().slice(0,10);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shop-billing-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Backup downloaded');
  }catch(e){
    console.error('Backup failed', e);
    showToast('Could not create backup');
  }
}

async function handleRestoreFile(event){
  const file = event.target.files && event.target.files[0];
  if(!file){ return; }

  try{
    const text = await file.text();
    const parsed = JSON.parse(text);

    if(!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.inventory)){
      throw new Error('File does not look like a valid shop-billing backup.');
    }

    const confirmed = window.confirm(
      'This will replace ALL current data (inventory, bills, customers, expenses, shop settings) with the contents of this backup file. This cannot be undone. Continue?'
    );
    if(!confirmed){ event.target.value = ''; return; }

    const defaults = {
      shop: { name: 'My Shop', address: '', gst: '', phone: '', gstEnabled: true, upiId: '' },
      inventory: [], customers: [], bills: [], payments: [], expenses: [], nextBillNo: 1
    };

    DATA = Object.assign({}, defaults, parsed);
    DATA.shop = Object.assign({}, defaults.shop, parsed.shop || {});

    await saveData();
    state.viewingBill = null;
    state.viewingCustomer = null;
    state.showSettingsModal = false;
    render();
    showToast('Backup restored successfully');
  }catch(e){
    console.error('Restore failed', e);
    showToast("Could not read that file — make sure it's a valid backup .json");
  }finally{
    event.target.value = '';
  }
}

window.downloadBackup = downloadBackup;
window.handleRestoreFile = handleRestoreFile;
