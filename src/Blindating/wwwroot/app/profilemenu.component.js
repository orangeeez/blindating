System.register(['angular2/core', 'angular2/common', './mock/countries', './utils/component.utils', './user.service', './services/userinfo.service', './services/savecomponent.service', './app.component', 'angular2/router', './pipes/iterateto.pipe', 'ng2-bootstrap/ng2-bootstrap', './profilemenu.photos.component', './profilemenu.conversations.component', './profilemenu.notifications.component', './mock/utils'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, common_1, countries_1, component_utils_1, user_service_1, userinfo_service_1, savecomponent_service_1, app_component_1, router_1, iterateto_pipe_1, ng2_bootstrap_1, profilemenu_photos_component_1, profilemenu_conversations_component_1, profilemenu_notifications_component_1, utils_1;
    var ProfileMenuComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (countries_1_1) {
                countries_1 = countries_1_1;
            },
            function (component_utils_1_1) {
                component_utils_1 = component_utils_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (userinfo_service_1_1) {
                userinfo_service_1 = userinfo_service_1_1;
            },
            function (savecomponent_service_1_1) {
                savecomponent_service_1 = savecomponent_service_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (iterateto_pipe_1_1) {
                iterateto_pipe_1 = iterateto_pipe_1_1;
            },
            function (ng2_bootstrap_1_1) {
                ng2_bootstrap_1 = ng2_bootstrap_1_1;
            },
            function (profilemenu_photos_component_1_1) {
                profilemenu_photos_component_1 = profilemenu_photos_component_1_1;
            },
            function (profilemenu_conversations_component_1_1) {
                profilemenu_conversations_component_1 = profilemenu_conversations_component_1_1;
            },
            function (profilemenu_notifications_component_1_1) {
                profilemenu_notifications_component_1 = profilemenu_notifications_component_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }],
        execute: function() {
            ProfileMenuComponent = (function () {
                function ProfileMenuComponent(app, _router, _userService, _userInfoService, _saveComponentService) {
                    var _this = this;
                    this._router = _router;
                    this._userService = _userService;
                    this._userInfoService = _userInfoService;
                    this._saveComponentService = _saveComponentService;
                    this.bellClass = 'fa fa-bell-o fa-lg';
                    this.tabs = [
                        { title: 'Basic', active: true },
                        { title: 'Interests', active: false },
                        { title: 'Eductaion', active: false },
                        { title: 'Notifications', active: false }
                    ];
                    this.purpose = true;
                    this.question = "";
                    this.gender = "";
                    this.genders = ['Man', 'Woman ', 'Anyway'];
                    this.relation = "";
                    this.relationships = ['Friendship', 'Partnership', 'Relationship', 'Fun'];
                    this.age = { from: '', to: '' };
                    this.ages = Array.from(Array(80).keys()).slice(16, 80);
                    this.city = "";
                    this.cities = [];
                    this.country = "";
                    this.countries = countries_1.COUNTRIES;
                    this.isOpenPhotos = false;
                    this.isOpenConversations = false;
                    this.filterDropdownInputCountry = function (country) {
                        return country.includes(_this.country);
                    };
                    this.filterDropdownInputCity = function (city) {
                        return city.includes(_this.city);
                    };
                    this.app = app;
                }
                ProfileMenuComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var tuser;
                    if (this.app.selectedUser) {
                        tuser = this.app.selectedUser;
                        this.selectedUserBeforeDestroy = tuser;
                    }
                    else
                        tuser = this.app.user;
                    //if (this._saveComponentService.isProfilemenuSaved) {
                    //    if (this._saveComponentService.profilemenu) {
                    //        if (tuser.JWT == this._saveComponentService.profilemenu.user.JWT) {
                    //            this.profilemenu = this._saveComponentService.LoadProfilemenu();
                    //            this.photos = this.profilemenu.photos;
                    //            this.notifications = this.profilemenu.notifications;
                    //            this.conversations = this.profilemenu.conversations;
                    //            this.questions = this.profilemenu.questions;
                    //            this.question = this.profilemenu.question;
                    //            this.cities = this.profilemenu.cities;
                    //            this.CITIES = this.profilemenu.CITIES;
                    //            this.country = this.profilemenu.country;
                    //            this.city = this.profilemenu.city;
                    //            this.gender = this.profilemenu.gender;
                    //            this.relation = this.profilemenu.relation;
                    //            this.age = this.profilemenu.age;
                    //            this.quote = this.profilemenu.quote;
                    //            this.currentQuestionIndex = this.profilemenu.currentQuestionIndex;
                    //            this.isOpenConversations = this.profilemenu.isOpenConversations;
                    //            this.isOpenPhotos = this.profilemenu.isOpenPhotos;
                    //        }
                    //    }
                    //}
                    //else {
                    this._userInfoService.GetRandomQuote(tuser.ID.toString())
                        .subscribe(function (quote) {
                        _this.quote = quote;
                        _this._userInfoService.GetPhotos(tuser.ID.toString())
                            .subscribe(function (photos) {
                            _this.photos = photos;
                            _this._userInfoService.GetConversations(tuser.ID.toString())
                                .subscribe(function (conversations) {
                                _this.conversations = conversations;
                                _this.updateConversationsData(_this.conversations);
                                _this._userInfoService.GetQuestions(tuser.ID.toString())
                                    .subscribe(function (questions) {
                                    _this.currentQuestionIndex = 0;
                                    _this.questions = questions;
                                    _this.question = questions[0].Message;
                                    _this._userInfoService.GetPreferences(tuser.ID + "")
                                        .subscribe(function (preferences) {
                                        _this.gender = preferences.Gender;
                                        _this.relation = preferences.Relationship;
                                        _this.age['from'] = preferences.From;
                                        _this.age['to'] = preferences.To;
                                        _this.country = preferences.Country;
                                        _this.city = preferences.City;
                                    });
                                });
                            });
                        });
                    });
                    //}
                    for (var _i = 0, _a = this.notifications; _i < _a.length; _i++) {
                        var notification = _a[_i];
                        var n = JSON.parse(notification);
                        if (!n.IsShown && !this.app.selectedUser) {
                            this.bellClass = 'fa fa-bell fa-lg';
                            this.tabs[0]["active"] = false;
                            this.tabs[3]["active"] = true;
                        }
                    }
                };
                ProfileMenuComponent.prototype.ngOnDestroy = function () {
                    this.profilemenu = new component_utils_1.Profilemenu();
                    this.profilemenu.photos = this.photos;
                    this.profilemenu.notifications = this.notifications;
                    this.profilemenu.conversations = this.conversations;
                    this.profilemenu.questions = this.questions;
                    this.profilemenu.city = this.city;
                    this.profilemenu.cities = this.cities;
                    this.profilemenu.CITIES = this.CITIES;
                    this.profilemenu.country = this.country;
                    this.profilemenu.gender = this.gender;
                    this.profilemenu.relation = this.relation;
                    this.profilemenu.age = this.age;
                    this.profilemenu.question = this.question;
                    this.profilemenu.quote = this.quote;
                    this.profilemenu.currentQuestionIndex = this.currentQuestionIndex;
                    this.profilemenu.isOpenConversations = this.isOpenConversations;
                    this.profilemenu.isOpenPhotos = this.isOpenPhotos;
                    if (this.selectedUserBeforeDestroy)
                        this.profilemenu.user = this.selectedUserBeforeDestroy;
                    else
                        this.profilemenu.user = this.app.user;
                    this._saveComponentService.SaveProfilemenu(this.profilemenu);
                };
                ProfileMenuComponent.prototype.logout = function () {
                    var _this = this;
                    this._userService.DeleteOnlineUser(this.app.user.ID.toString())
                        .subscribe(function (deleted) {
                        if (deleted) {
                            _this.app.headerIsShow = false;
                            _this.app.footerIsShow = false;
                            _this.app.headerProfileImage = null;
                            _this.app.profilemenuIsShow = false;
                            _this.app.hideProfileMenu();
                            _this.app.user = null;
                            _this._router.navigate(['Login']);
                            document.cookie = 'jwt=; Max-Age=0';
                        }
                    });
                };
                ProfileMenuComponent.prototype.dropdownSelect = function (event) {
                    var _this = this;
                    var element = event.target;
                    switch (element['id']) {
                        case 'gender':
                            this.gender = element['innerHTML'];
                            break;
                        case 'relation':
                            this.relation = element['innerHTML'];
                            break;
                        case 'age-from':
                            this.age.from = element['innerHTML'];
                            break;
                        case 'age-to':
                            this.age.to = element['innerHTML'];
                            break;
                        case 'country':
                            this.country = element['innerHTML'];
                            this._userInfoService.GetCities(this.country)
                                .subscribe(function (cities) {
                                _this.CITIES = cities;
                                _this.cities = cities;
                            });
                            break;
                        case 'city':
                            this.city = element['innerHTML'];
                            break;
                    }
                    this._userInfoService.SetPreference(this.app.user.ID, element['id'], element['innerHTML']).subscribe();
                };
                ProfileMenuComponent.prototype.searchDropdownInput = function (event) {
                    var element = event.target;
                    switch (element['id']) {
                        case 'country-dropdown': this.countries = countries_1.COUNTRIES.filter(this.filterDropdownInputCountry);
                        case 'city-dropdown':
                            this.cities = this.CITIES.filter(this.filterDropdownInputCity);
                    }
                };
                ProfileMenuComponent.prototype.openPhotos = function () {
                    this.isOpenPhotos = true;
                };
                ProfileMenuComponent.prototype.onBackPhotos = function () {
                    this.isOpenPhotos = false;
                };
                ProfileMenuComponent.prototype.openConversations = function () {
                    this.isOpenConversations = true;
                };
                ProfileMenuComponent.prototype.onBackConversations = function () {
                    this.isOpenConversations = false;
                };
                ProfileMenuComponent.prototype.onExitProfile = function (event) {
                    if (this.app.selectedUser)
                        this.app._searchComponent.deselectSearchUser();
                    else
                        this.app.hideProfileMenu();
                };
                ProfileMenuComponent.prototype.onQuestionLeft = function () {
                    if (this.currentQuestionIndex - 1 >= 0) {
                        this.currentQuestionIndex--;
                        this.question = this.questions[this.currentQuestionIndex]["Message"];
                    }
                };
                ProfileMenuComponent.prototype.onQuestionRight = function () {
                    if (this.currentQuestionIndex + 1 <= this.questions.length) {
                        this.currentQuestionIndex++;
                        this.question = this.questions[this.currentQuestionIndex]["Message"];
                    }
                };
                ProfileMenuComponent.prototype.onAcceptQuestion = function () {
                    var answer = {
                        ID: 0,
                        Result: true,
                        UserID: this.app.selectedUser.ID,
                        RemoteUserID: this.app.user.ID,
                        Message: this.question
                    };
                    this._userInfoService.SetAnswer(answer)
                        .subscribe(function (isAdded) { });
                    this.currentQuestionIndex++;
                    if (this.currentQuestionIndex >= this.questions.length)
                        this.question = null;
                    else
                        this.question = this.questions[this.currentQuestionIndex]["Message"];
                };
                ProfileMenuComponent.prototype.onDeclineQuestion = function () {
                    var answer = {
                        ID: 0,
                        Result: false,
                        UserID: this.app.selectedUser.ID,
                        RemoteUserID: this.app.user.ID,
                        Message: this.question
                    };
                    this._userInfoService.SetAnswer(answer)
                        .subscribe(function (isAdded) { });
                    this.currentQuestionIndex++;
                    if (this.currentQuestionIndex >= this.questions.length)
                        this.question = null;
                    else
                        this.question = this.questions[this.currentQuestionIndex]["Message"];
                };
                ProfileMenuComponent.prototype.updateConversationsData = function (conversations) {
                    for (var _i = 0, conversations_1 = conversations; _i < conversations_1.length; _i++) {
                        var c = conversations_1[_i];
                        var start = new Date(Date.parse(c.Start.toString()));
                        var end = new Date(Date.parse(c.Start.toString()));
                        c.StartString = start.getFullYear() + '/' + start.getMonth() + '/' + start.getDate() + ' ' + start.getHours() + 'h ' + start.getMinutes() + 'm ' + start.getSeconds() + 's';
                        c.EndString = end.getFullYear() + '/' + end.getMonth() + '/' + end.getDate() + ' ' + end.getHours() + 'h ' + end.getMinutes() + 'm ' + end.getSeconds() + 's';
                    }
                };
                //#region OpenGallery
                ProfileMenuComponent.prototype.openGallery = function (event) {
                    var items = [];
                    for (var _i = 0, _a = this.photos; _i < _a.length; _i++) {
                        var photo = _a[_i];
                        if (utils_1.API_ADDRESS + photo.Path === event.target['src']) {
                            items.unshift({
                                src: utils_1.API_ADDRESS + photo.Path,
                                w: photo.Width,
                                h: photo.Height
                            });
                        }
                        else
                            items.push({
                                src: utils_1.API_ADDRESS + photo.Path,
                                w: photo.Width,
                                h: photo.Height
                            });
                    }
                    var openPhotoSwipe = function (items) {
                        var pswpElement = document.querySelectorAll('.pswp')[0];
                        var options = {
                            history: false,
                            focus: false,
                            showAnimationDuration: 0,
                            hideAnimationDuration: 0
                        };
                        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                        gallery.init();
                    };
                    openPhotoSwipe(items);
                };
                ProfileMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'profilemenu',
                        templateUrl: 'app/profilemenu.component.html',
                        styleUrls: ['app/profilemenu.component.css', 'app/search.component.css', 'css/styles.css'],
                        pipes: [iterateto_pipe_1.IterateToPipe],
                        directives: [common_1.CORE_DIRECTIVES, ng2_bootstrap_1.DROPDOWN_DIRECTIVES, ng2_bootstrap_1.TAB_DIRECTIVES, profilemenu_photos_component_1.ProfileMenuPhotosComponent, profilemenu_conversations_component_1.ProfileMenuConversationsComponent, profilemenu_notifications_component_1.ProfileMenuNotificationsComponent],
                        inputs: ['acceptIconPath', 'declineIconPath', 'notifications']
                    }),
                    __param(0, core_1.Host()),
                    __param(0, core_1.Inject(core_1.forwardRef(function () { return app_component_1.AppComponent; }))), 
                    __metadata('design:paramtypes', [app_component_1.AppComponent, router_1.Router, user_service_1.UserService, userinfo_service_1.UserInfoService, savecomponent_service_1.SaveComponentService])
                ], ProfileMenuComponent);
                return ProfileMenuComponent;
            }());
            exports_1("ProfileMenuComponent", ProfileMenuComponent);
        }
    }
});
