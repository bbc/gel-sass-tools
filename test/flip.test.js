describe('flip()', () => {
  describe('in ltr mode', () => {
    it('is maintained when setting text alignment', async () => {
      const css = await global.compileCSS('test/data/flip/text-align.scss');

      expect(css).toMatchSnapshot();
    });

    it('is maintained when setting float', async () => {
      const css = await global.compileCSS('test/data/flip/float.scss');

      expect(css).toMatchSnapshot();
    });

    it('is maintained when setting direction', async () => {
      const css = await global.compileCSS('test/data/flip/direction.scss');

      expect(css).toMatchSnapshot();
    });

    it('is maintained when setting flex-direction', async () => {
      const css = await global.compileCSS('test/data/flip/flex-direction.scss');

      expect(css).toMatchSnapshot();
    });
  });

  describe('in rtl mode', () => {
    it('is applied when setting text alignment', async () => {
      const css = await global.compileCSS('test/data/flip/text-align--rtl.scss');

      expect(css).toMatchSnapshot();
    });

    it('is applied when setting float', async () => {
      const css = await global.compileCSS('test/data/flip/float--rtl.scss');

      expect(css).toMatchSnapshot();
    });

    it('is applied when setting direction', async () => {
      const css = await global.compileCSS('test/data/flip/direction--rtl.scss');

      expect(css).toMatchSnapshot();
    });

    it('is applied when setting flex-direction', async () => {
      const css = await global.compileCSS('test/data/flip/flex-direction--rtl.scss');

      expect(css).toMatchSnapshot();
    });
  });
});
