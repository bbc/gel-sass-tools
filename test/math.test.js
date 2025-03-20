describe('math()', () => {
  describe('with positive values', () => {
    it('should return a quarter of the given value', async () => {
      const css = await global.compileCSS('test/data/math/quarter.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return a third of the given value', async () => {
      const css = await global.compileCSS('test/data/math/third.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return a halve of the given value', async () => {
      const css = await global.compileCSS('test/data/math/halve.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return two times the given value', async () => {
      const css = await global.compileCSS('test/data/math/double.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return three times the given value', async () => {
      const css = await global.compileCSS('test/data/math/triple.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return four times the given value', async () => {
      const css = await global.compileCSS('test/data/math/quadruple.scss');

      expect(css).toMatchSnapshot();
    });
  });

  describe('with negative values', () => {
    it('should return a quarter of the given value', async () => {
      const css = await global.compileCSS('test/data/math/quarter-negative.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return a third of the given value', async () => {
      const css = await global.compileCSS('test/data/math/third-negative.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return a halve of the given value', async () => {
      const css = await global.compileCSS('test/data/math/halve-negative.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return two times the given value', async () => {
      const css = await global.compileCSS('test/data/math/double-negative.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return three times the given value', async () => {
      const css = await global.compileCSS('test/data/math/triple-negative.scss');

      expect(css).toMatchSnapshot();
    });

    it('should return four times the given value', async () => {
      const css = await global.compileCSS('test/data/math/quadruple-negative.scss');

      expect(css).toMatchSnapshot();
    });
  });
});
