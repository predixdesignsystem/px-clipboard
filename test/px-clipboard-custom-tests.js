suite('Custom Automation Tests for px-clipboard', function() {
  let clipboardEl,
      stubMethod;

  setup((done)=>{
    clipboardEl = fixture('px-clipboard-fixture');
    stubMethod = sinon.stub(document, 'execCommand');
    stubMethod.returns(true);
    flush(()=>{
      done();
    })
  });

  teardown(() => {
      stubMethod.restore();
  });

  test('check element initialises', ()=>{
    assert.equal(clipboardEl.tagName, 'PX-CLIPBOARD');
  });

  test('check can set dataClipboardText', ()=>{
    clipboardEl.dataClipboardText = "LRN2CODE";
    assert.equal(clipboardEl.dataClipboardText, 'LRN2CODE');
  });

  test('check can set dataClipboardText and fire event', (done)=>{
    let clipboardCopyIcon = Polymer.dom(clipboardEl.root).querySelector('#copy');

    clipboardEl.dataClipboardText = "LRN2CODE";
    clipboardEl.addEventListener('pxClipboardSuccess', (evt)=>{
      assert.equal(evt.detail.action, 'copy');
      assert.equal(evt.detail.text, 'LRN2CODE');
      done();
    });
    flush(()=>{
      clipboardCopyIcon.click();
    });

  });

  test('check copy operation successful on copy from input', function(done){
    let clipboardCopy = fixture('px-clipboard-copy-fixture'),
        clipboardCopyIcon = Polymer.dom(clipboardCopy.root).querySelector('#copy'),
        clipInput = Polymer.dom(clipboardCopy).querySelector('input');

    assert.equal(clipInput.value, 'hello World Copy');
    clipboardCopy.addEventListener('pxClipboardSuccess', (evt)=> {
      assert.equal(evt.detail.action, 'copy');
      assert.equal(evt.detail.text, 'hello World Copy');
      done();
    });
    flush(()=>{
      clipboardCopyIcon.click();
    });
  });

  test('check cut operation successful on copy from input', function(done){
    let clipboardCut = fixture('px-clipboard-cut-fixture'),
        clipboardCutIcon = Polymer.dom(clipboardCut.root).querySelector('#copy');

    clipboardCut.addEventListener('pxClipboardSuccess', (evt)=>{
      assert.equal(evt.detail.action, 'cut');
      assert.equal(evt.detail.text, 'hello World Cut');
      done();
    });
    flush(()=>{
      clipboardCutIcon.click();
    });
  });
});
