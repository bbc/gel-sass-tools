describe('rtl()', () => {
  it('uses ltr when the $rtl variable is not set', async () => {
    const css = await global.compileCSS('test/data/rtl/left.scss');

    expect(css).toMatchSnapshot();
  });

  it('switches to rtl when the $rtl variable is set to `true`', async () => {
    const css = await global.compileCSS('test/data/rtl/right.scss');

    expect(css).toMatchSnapshot();
  });
});
