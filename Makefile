# ------------------ Golang commands ------------------
.PHONY: clean format install update run scan build start
clean:
	@pnpm cache clean
format:
	@pnpm exec prettier . --write
format-check:
	@pnpm exec prettier . --check
install:
	@pnpm install
update:
	@pnpm up --latest
run:
	@pnpm dev
scan:
	@pnpm audit
build:
	@pnpm build
start:
	@pnpm start

# ------------------ Docker commands ------------------
.PHONY: docker-dashboard
docker-dashboard:
	@docker-compose --env-file .env up --build --no-deps -d dashboard

.PHONY: docker-ghcr-login
docker-ghcr-login:
	@echo "" ;\
	echo "Login - GitHub Docker Registry" ;\
	read -p "Enter your Github username: " gUsername ;\
	read -p "Enter your Github personal access token: " gPass ;\
	echo "" ;\
	echo $$gPass | docker login ghcr.io -u $$gUsername --password-stdin ;\

.PHONY: docker-ghcr-push-specific docker-ghcr-pull-specific
docker-ghcr-push-specific:
	@echo "" ;\
	echo "Tag - GitHub Docker Registry" ;\
	gCorp="4kpros" ;\
	gRepo="next-dashboard" ;\
	read -p "Enter your package name(dashboard): " gPackage; gTag=$${gPackage:-"dashboard"} ;\
	read -p "Enter your tag(default is 1): " gTag; gTag=$${gTag:-"1"} ;\
	docker tag next-dashboard-$$gPackage ghcr.io/$$gCorp/$$gRepo/$$gPackage:$$gTag ;\
	echo "" ;\
	echo "Pushing $$gPackage - GitHub Docker Registry" ;\
	docker push ghcr.io/$$gCorp/$$gRepo/$$gPackage:$$gTag;
docker-ghcr-pull-specific:
	@echo "" ;\
	echo "Tag - GitHub Docker Registry" ;\
	gCorp="4kpros" ;\
	gRepo="next-dashboard" ;\
	read -p "Enter your package name(dashboard): " gPackage; gTag=$${gPackage:-"dashboard"} ;\
	read -p "Enter your tag(default is 1): " gTag; gTag=$${gTag:-"1"} ;\
	echo "" ;\
	echo "Pulling $$gPackage - GitHub Docker Registry" ;\
	docker pull ghcr.io/$$gCorp/$$gRepo/$$gPackage:$$gTag