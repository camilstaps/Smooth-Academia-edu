smooth-academia-edu.zip: .FORCE
	$(RM) $@
	zip $@ \
		manifest.json \
		*.css \
		*.js \
		*.html \
		icons/*.png \
		README.md \
		LICENSE\

.FORCE:

.PHONY: .FORCE
