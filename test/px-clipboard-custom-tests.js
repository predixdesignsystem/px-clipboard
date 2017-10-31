suite('Custom Automation Tests for px-clipboard', function() {
  let clipboardEl,
      stubMethod;

  setup((done)=>{
    clipboardEl = fixture('px_clipboard_fixture');
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



  // test('check copy operation successful on copy from input', function(done){
  //   let clipboardCopyIcon = Polymer.dom(clipboardCopy.root).querySelector('#copy');
  //   clipboardCopy.addEventListener('pxClipboardSuccess', (evt)=> {
  //     debugger;
  //     assert.equal(evt.detail.value, 'hello World Copy');
  //     done();
  //   });
  //   clipboardCopy.addEventListener('pxClipboardError', (evt)=> {
  //     assert.isOk(false, 'pxClipBoardError event raised, something is broken.');
  //     done();
  //   });
  //   clipboardCopyIcon.click();
  // });

  // test('check cut operation successful on copy from input', function(done){
  //   var cutEventReceived = false,
  //       listen = function(evt) {
  //         cutEventReceived = true;
  //         assert.isTrue(cutEventReceived);
  //         clipboardCut.removeEventListener('pxClipboardSuccess', listen);
  //         clipboardCut.removeEventListener('pxClipboardError', listen);
  //         done();
  //       },
  //       clipboardCutIcon = Polymer.dom(clipboardCut.root).querySelector('#copy');
  //   clipboardCut.addEventListener('pxClipboardSuccess', listen);
  //   clipboardCut.addEventListener('pxClipboardError', listen);
  //   clipboardCutIcon.click();
  // });
  //
  // test('check text copy operation successful', function(done){
  //   var textEventReceived = false,
  //       listen = function(evt) {
  //         textEventReceived = true;
  //         assert.isTrue(textEventReceived);
  //         clipboardText.removeEventListener('pxClipboardSuccess', listen);
  //         clipboardText.removeEventListener('pxClipboardError', listen);
  //         done();
  //       },
  //       clipboardCopyTextIcon = Polymer.dom(clipboardText.root).querySelector('#copy');
  //   clipboardText.addEventListener('pxClipboardSuccess', listen);
  //   clipboardText.addEventListener('pxClipboardError', listen);
  //   clipboardCopyTextIcon.click();
  //
  //   setTimeout(function() {
  //     clipboardText.removeEventListener('pxClipboardSuccess', listen);
  //     clipboardText.removeEventListener('pxClipboardError', listen);
  //     assert.isTrue(false);
  //     done();
  //   },200);
  // });
});
